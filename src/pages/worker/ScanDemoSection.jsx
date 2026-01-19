import { useState, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls, Text } from '@react-three/drei';
import { ICJigModel } from '../../components/3d/models';

// 3D Draggable IC Chip Component
function DraggableICChip3D({ icNumber, position, onDrop, targetPosition }) {
    const meshRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [currentPos, setCurrentPos] = useState(position);

    useFrame(() => {
        if (meshRef.current && !isDragging) {
            // Check distance to target position (updated for centered model)
            const distance = Math.sqrt(
                Math.pow(currentPos[0] - targetPosition[0], 2) + 
                Math.pow(currentPos[1] - targetPosition[1], 2) + 
                Math.pow(currentPos[2] - targetPosition[2], 2)
            );
            
            // If close to scanner platform, trigger drop
            if (distance < 1.2) {
                onDrop();
            }
        }
    });

    const handlePointerDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const handlePointerMove = (e) => {
        if (isDragging) {
            const newPos = [e.point.x, e.point.y, e.point.z];
            setCurrentPos(newPos);
        }
    };

    return (
        <group 
            ref={meshRef}
            position={currentPos}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            {/* IC Chip Body */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.4, 0.1, 0.4]} />
                <meshStandardMaterial 
                    color={isDragging ? "#4ade80" : "#2a2a2a"} 
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>
            
            {/* IC Text Label */}
            <Text
                position={[0, 0.06, 0]}
                rotation={[-Math.PI/2, 0, 0]}
                fontSize={0.08}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {icNumber}
            </Text>
            
            {/* Glow effect when dragging */}
            {isDragging && (
                <mesh>
                    <sphereGeometry args={[0.6, 16, 16]} />
                    <meshBasicMaterial 
                        color="#22d3ee" 
                        transparent 
                        opacity={0.2} 
                    />
                </mesh>
            )}
        </group>
    );
}

const ScanDemoSection = () => {
    const navigate = useNavigate();
    const [icNumber, setIcNumber] = useState('');
    const [searching, setSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [isChipDropped, setIsChipDropped] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanResult, setScanResult] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [chipPosition, setChipPosition] = useState({ x: 0, y: 0 });

    const handleSearch = async () => {
        if (!icNumber.trim()) return;
        
        setSearching(true);
        setSearchResult(null);

        // Simulate API search
        setTimeout(() => {
            const isFound = Math.random() > 0.3;
            const confidence = isFound ? 85 + Math.random() * 15 : 45 + Math.random() * 30;

            setSearchResult({
                found: isFound,
                icNumber: icNumber.trim(),
                confidence: confidence.toFixed(1),
                details: isFound ? {
                    manufacturer: 'Intel Corporation',
                    model: 'Core i7-12700K',
                    year: '2023',
                    batch: `BATCH-${Math.floor(Math.random() * 10000)}`,
                    status: 'Authentic'
                } : {
                    reason: 'IC number not found in database',
                    suggestions: ['Check IC number format', 'Verify physical markings']
                },
                timestamp: new Date().toISOString()
            });

            setSearching(false);
        }, 2000);
    };

    const resetSearch = () => {
        setIcNumber('');
        setSearchResult(null);
        setIsChipDropped(false);
        setIsScanning(false);
        setScanProgress(0);
        setScanResult(null);
        setCurrentStep(1);
    };

    const handleChipDrop = () => {
        if (icNumber.trim()) {
            setIsChipDropped(true);
            setCurrentStep(4);
            setIsDragging(false);
            // Auto-start scanning and navigate to scan page when IC is dropped
            setTimeout(() => {
                // Pass the IC number to the scan page
                navigate('/worker/scan', { 
                    state: { 
                        icNumber: icNumber.trim(),
                        autoStart: true 
                    } 
                });
            }, 800);
        }
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (event) => {
        setIsDragging(false);
        // Check if dropped on the scanner area (right side)
        const dropX = event.clientX;
        const windowWidth = window.innerWidth;
        
        if (dropX > windowWidth / 2) { // Dropped on right side (scanner)
            handleChipDrop();
        }
    };

    const startScanning = async () => {
        if (!isChipDropped || !icNumber.trim()) return;
        
        setIsScanning(true);
        setCurrentStep(4);
        setScanProgress(0);
        
        // Simulate scanning progress
        for (let i = 0; i <= 100; i += 5) {
            await new Promise(resolve => setTimeout(resolve, 100));
            setScanProgress(i);
        }
        
        // Simulate scan result
        const mockScanResult = {
            icNumber: icNumber,
            authentic: Math.random() > 0.3, // 70% chance of authentic
            confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
            details: {
                manufacturer: icNumber.toLowerCase().includes('intel') ? 'Intel Corporation' : 
                           icNumber.toLowerCase().includes('amd') ? 'AMD Inc.' : 
                           icNumber.toLowerCase().includes('stm') ? 'STMicroelectronics' : 
                           'Generic Semiconductor',
                dateCode: '2024W' + String(Math.floor(Math.random() * 52) + 1).padStart(2, '0'),
                lotCode: 'LOT' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                package: 'BGA-' + (Math.floor(Math.random() * 500) + 100),
                voltage: (Math.random() * 2 + 1).toFixed(2) + 'V',
                temperature: '-40°C to +85°C'
            },
            timestamp: new Date().toLocaleString()
        };
        
        setScanResult(mockScanResult);
        setIsScanning(false);
    };

    const steps = [
        {
            number: "01",
            title: "Position Scanner",
            description: "Automated positioning system aligns the inspection rig for optimal scanning",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
            )
        },
        {
            number: "02",
            title: "Automated Scan",
            description: "High-resolution camera captures detailed images of IC markings",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            number: "03",
            title: "AI Analysis",
            description: "Machine learning models verify authenticity in real-time",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        },
        {
            number: "04",
            title: "Instant Results",
            description: "Get authentication report with confidence score and verification",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Enhanced gradient background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
            </div>

            <div className="relative z-10 flex h-screen">
                {/* Left Side - IC Scanner Control Panel */}
                <div className="w-1/2 h-full relative p-8 flex flex-col">
                    {/* IC Scanner Control - Only show after chip is dropped */}
                    {isChipDropped ? (
                        <div className="mb-8">
                            <div className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6">
                                <h3 className="text-cyan-400 font-bold text-xl mb-4">IC Scanner Control</h3>
                                
                                {/* Scanner Status */}
                                <div className="p-4 bg-green-950/30 border border-green-500/30 rounded-lg text-center mb-4">
                                    <div className="text-green-400 font-semibold mb-2">
                                        ✓ IC Chip Detected: {icNumber}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Redirecting to scanning page...</span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={resetSearch}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    Reset Demo
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Initial Instructions - Before chip is dropped */
                        <div className="mb-8">
                            <div className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6">
                                <h3 className="text-cyan-400 font-bold text-xl mb-4">IC Demo Instructions</h3>
                            
                            {/* Current Step Indicator */}
                            <div className="mb-4 flex items-center gap-2">
                                <div className="text-cyan-400 text-sm font-medium">Step {currentStep} of 4</div>
                                <div className="flex-1 bg-white/10 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(currentStep / 4) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* IC Number Input */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white font-medium mb-2">Step 1: Enter IC Number</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={icNumber}
                                            onChange={(e) => {
                                                setIcNumber(e.target.value);
                                                if (e.target.value.trim()) setCurrentStep(2);
                                                else setCurrentStep(1);
                                            }}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="e.g., i7-12700K, STM32F103"
                                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all"
                                            disabled={searching || isScanning}
                                            style={{
                                                color: 'white',
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderColor: 'rgba(255, 255, 255, 0.2)'
                                            }}
                                        />
                                        <button
                                            onClick={handleSearch}
                                            disabled={!icNumber.trim() || searching || isScanning}
                                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                                        >
                                            {searching ? 'Searching...' : 'Verify'}
                                        </button>
                                    </div>
                                </div>

                                {/* Step 2: Drop IC Chip */}
                                {searchResult && searchResult.found && (
                                    <div className="mt-4">
                                        <label className="block text-white font-medium mb-2">Step 2: Drop IC on Scanner</label>
                                        <div 
                                            className={`p-4 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${
                                                isChipDropped 
                                                    ? 'border-green-500 bg-green-950/30 text-green-400' 
                                                    : isDragging
                                                    ? 'border-yellow-400 bg-yellow-950/20 text-yellow-300'
                                                    : 'border-cyan-400/50 bg-cyan-950/20 text-cyan-300'
                                            }`}
                                        >
                                            {isChipDropped ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>✓</span>
                                                    <span>IC Chip Placed on Scanner</span>
                                                </div>
                                            ) : isDragging ? (
                                                <div>
                                                    <div className="text-2xl mb-2 animate-bounce">🎯</div>
                                                    <div className="font-semibold">Drop IC here or on the scanner model!</div>
                                                    <div className="text-sm text-gray-400 mt-1">Release to place the IC chip</div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="text-2xl mb-2">🔍</div>
                                                    <div className="font-semibold text-cyan-400 mb-2">IC Ready: {icNumber}</div>
                                                    <div>Drag the floating IC chip onto the scanner →</div>
                                                    <div className="text-sm text-gray-400 mt-1">Scanning will start automatically when dropped</div>
                                                    <button
                                                        onClick={handleChipDrop}
                                                        className="mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm transition-colors"
                                                    >
                                                        Skip - Auto Place & Scan
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Auto-Scanning Status */}
                                {isChipDropped && !isScanning && !scanResult && (
                                    <div className="mt-4">
                                        <div className="p-4 bg-green-950/30 border border-green-500/30 rounded-lg text-center">
                                            <div className="text-green-400 font-semibold mb-2">
                                                ✓ IC Chip Detected on Scanner
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                                                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                                                <span>Redirecting to scanning page...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Scanning Progress */}
                                {isScanning && (
                                    <div className="mt-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-blue-400 font-medium">Scanning IC Chip...</span>
                                        </div>
                                        <div className="bg-white/10 rounded-full h-3 mb-2">
                                            <div 
                                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                                                style={{ width: `${scanProgress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-center text-blue-300 text-sm">{scanProgress}% Complete</div>
                                    </div>
                                )}

                                {(icNumber || searchResult) && (
                                    <button
                                        onClick={resetSearch}
                                        className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-lg hover:bg-white/20 transition-colors"
                                        disabled={searching}
                                    >
                                        Reset Demo
                                    </button>
                                )}
                            </div>
                        </div>
                    

                            {/* Search Progress */}
                            {searching && (
                                <div className="mt-4 flex items-center gap-3 text-blue-400 bg-blue-950/30 rounded-lg p-3">
                                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Verifying IC number in database...</span>
                                </div>
                            )}

                            {/* Search Results */}
                            {searchResult && !searching && (
                                <div className={`mt-4 p-4 rounded-lg border ${
                                    searchResult.found 
                                        ? 'bg-green-950/40 border-green-500/30' 
                                        : 'bg-red-950/40 border-red-500/30'
                                }`}>
                                    <div className={`font-semibold text-lg mb-3 ${
                                        searchResult.found ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {searchResult.found ? '✓ IC Found in Database!' : '✗ IC Not Found'}
                                    </div>
                                    <div className="text-sm text-gray-300 space-y-2">
                                        <div className="flex justify-between">
                                            <span>IC Number:</span>
                                            <span className="font-mono">{searchResult.icNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Confidence:</span>
                                            <span className="font-bold">{searchResult.confidence}%</span>
                                        </div>
                                        {searchResult.found && searchResult.details && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span>Model:</span>
                                                    <span>{searchResult.details.model}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Status:</span>
                                                    <span className="text-green-400">{searchResult.details.status}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {searchResult.found && (
                                        <div className="mt-3 text-center text-green-400 text-sm">
                                            ✓ Ready for physical scanning
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Final Scan Results */}
                            {scanResult && !isScanning && (
                                <div className={`mt-4 p-6 rounded-lg border-2 ${
                                    scanResult.authentic 
                                        ? 'bg-green-950/50 border-green-400' 
                                        : 'bg-red-950/50 border-red-400'
                                }`}>
                                    <div className={`font-bold text-xl mb-4 flex items-center gap-3 ${
                                        scanResult.authentic ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        <div className="text-3xl">
                                            {scanResult.authentic ? '✅' : '❌'}
                                        </div>
                                        <div>
                                            {scanResult.authentic ? 'AUTHENTIC IC' : 'COUNTERFEIT DETECTED'}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-2">
                                            <div className="text-gray-300">
                                                <span className="font-medium">IC Number:</span>
                                                <div className="font-mono text-white">{scanResult.icNumber}</div>
                                            </div>
                                            <div className="text-gray-300">
                                                <span className="font-medium">Confidence:</span>
                                                <div className="font-bold text-white">{scanResult.confidence}%</div>
                                            </div>
                                            <div className="text-gray-300">
                                                <span className="font-medium">Manufacturer:</span>
                                                <div className="text-white">{scanResult.details.manufacturer}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="text-gray-300">
                                                <span className="font-medium">Date Code:</span>
                                                <div className="text-white">{scanResult.details.dateCode}</div>
                                            </div>
                                            <div className="text-gray-300">
                                                <span className="font-medium">Package:</span>
                                                <div className="text-white">{scanResult.details.package}</div>
                                            </div>
                                            <div className="text-gray-300">
                                                <span className="font-medium">Voltage:</span>
                                                <div className="text-white">{scanResult.details.voltage}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400 text-center">
                                        Scan completed: {scanResult.timestamp}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
           

                    {/* How to Scan - Bottom Section */}
                    <div className="flex-1">
                        <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-cyan-400">ℹ️</span>
                                </div>
                                <h4 className="text-white font-bold text-lg">How to Scan</h4>
                            </div>
                            
                            <div className="space-y-4">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                        <div className="w-6 h-6 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/30 flex-shrink-0 mt-0.5">
                                            <span className="text-cyan-400 font-bold text-xs">{step.number}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="text-cyan-400 text-sm">{step.icon}</div>
                                                <h5 className="text-white font-semibold text-sm">{step.title}</h5>
                                            </div>
                                            <p className="text-gray-400 text-xs">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg">
                                <div className="text-xs text-gray-400 text-center">
                                    💡 Try entering an IC number above to test the search functionality
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - 3D Model Only */}
                <div className="w-1/2 h-full relative">
                    {/* 3D Canvas - Right Side */}
                    <div className="w-full h-full flex justify-center items-center">
                        <Canvas
                            shadows
                            gl={{ alpha: true, antialias: true }}
                            dpr={[1, 2]}
                            className="w-full h-full"
                        >
                            <PerspectiveCamera makeDefault position={[-8, 5, 12]} fov={50} />

                            <ambientLight intensity={1.2} />
                            <spotLight position={[0, 8, 8]} angle={0.3} penumbra={1} intensity={2.5} color="#22d3ee" />
                            <pointLight position={[0, -8, 5]} intensity={2.5} color="#4dd0e1" />
                            <pointLight position={[0, 0, 5]} intensity={2.5} color="#06b6d4" />

                            <Suspense fallback={null}>
                                <group position={[-3, 0, 0]}>
                                    <ICJigModel />
                                </group>
                                
                                {/* Draggable IC Chip */}
                                {searchResult && searchResult.found && !isChipDropped && (
                                    <DraggableICChip3D 
                                        icNumber={icNumber}
                                        position={[2, 3, 0]}
                                        onDrop={handleChipDrop}
                                        targetPosition={[-3, 1.5, 0]} // Scanner platform position (left side)
                                    />
                                )}
                                
                                {/* Placed IC Chip */}
                                {isChipDropped && (
                                    <group position={[-3, 1.5, 0]}>
                                        <mesh>
                                            <boxGeometry args={[0.3, 0.1, 0.3]} />
                                            <meshStandardMaterial color="#2a2a2a" />
                                        </mesh>
                                        {/* IC Text */}
                                        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI/2, 0, 0]}>
                                            <planeGeometry args={[0.25, 0.1]} />
                                            <meshBasicMaterial color="white" transparent opacity={0.9} />
                                        </mesh>
                                    </group>
                                )}
                                
                                <Environment preset="night" />
                            </Suspense>

                            <OrbitControls 
                                enableZoom={true} 
                                enablePan={true} 
                                enableRotate={true}
                                target={[-3, 0, 0]}
                                maxDistance={25}
                                minDistance={8}
                            />
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanDemoSection;