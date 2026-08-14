# AuthentiChip

![Authentichip Banner](https://via.placeholder.com/1200x400?text=Authentichip+3D+Platform)

> **AI-Powered Automated Optical Inspection System for Counterfeit IC Detection**

AuthentiChip is an intelligent Automated Optical Inspection (AOI) platform designed to identify counterfeit Integrated Circuits (ICs) by analyzing their physical markings, visual characteristics, dimensions, and manufacturer-specific information.

The system combines computer vision, machine learning, OCR, geometric analysis, and an offline-first backend to automate a traditionally manual and error-prone inspection process. This repository specifically hosts the **3D-powered web application frontend** that visualizes the inspection hardware and process.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Why Counterfeit IC Detection Matters](#why-counterfeit-ic-detection-matters)
- [Solution](#solution)
- [Core Objectives](#core-objectives)
- [System Architecture](#system-architecture)
- [Inspection Pipeline](#inspection-pipeline)
- [Backend Architecture](#backend-architecture)
- [Technology Stack](#technology-stack)
- [3D Web Frontend (This Repository)](#3d-web-frontend-this-repository)
- [Why a Multi-Model System?](#why-a-multi-model-system)
- [Future Improvements](#future-improvements)
- [Team](#team)

---

## Problem Statement

**SIH 2025 — Problem Statement 25162**
*Automated Optical Inspection (AOI) based IC marking to identify fake marking*

The problem was proposed by **Bharat Electronics Limited (BEL)**.
The objective was to develop a system capable of inspecting IC markings in high-volume electronics production and identifying potentially counterfeit components. The system should reduce dependence on manual quality assurance while improving inspection speed, consistency, and reliability.

## Why Counterfeit IC Detection Matters

Counterfeit electronic components are a serious problem for electronics manufacturing, defense systems, aerospace, automotive electronics, telecommunications, and other industries where component authenticity directly affects reliability and safety.

Traditional IC inspection frequently depends on manual visual verification. An operator may need to inspect the manufacturer logo, part number, markings, date/lot code, package dimensions, pin configuration, surface texture, resurfacing (blacktopping), sanding marks, typography, and alignment.

This approach is difficult to scale and is vulnerable to human error, operator fatigue, inconsistent inspection, high inspection time, subjective decision-making, and limited traceability.

An IC can appear visually legitimate while containing subtle signs of tampering. Counterfeiters may modify original markings through sanding or original IC surfaces through resurfacing. Therefore, AuthentiChip treats authenticity verification as a multi-dimensional inspection problem. It asks: *"Does the complete visual and structural evidence of this IC agree with what is expected for this component?"*

## Solution

AuthentiChip combines multiple complementary verification techniques:

```text
┌──────────────────────┐
│       IC / DUT       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Image Acquisition   │
│   Pi HQ Camera       │
│  Controlled Lighting │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Image Preprocessing  │
└──────────┬───────────┘
           │
 ┌─────────┼─────────┐
 │         │         │
 ▼         ▼         ▼
┌────────┐┌─────────┐┌──────────┐
│HOG+SVM ││MiniCPM-V││Homography│
│Texture ││OCR/Codes││Dimensions│
└────┬───┘└───┬─────┘└───┬──────┘
     │        │          │
     └────────┼──────────┘
              ▼
┌──────────────────────┐
│  Validation Engine   │
│ Multi-factor scoring │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Authenticity Result  │
│ PASS / FAIL / REVIEW │
└──────────────────────┘
```

The architecture is intentionally multi-modal. Different models answer different questions.

## Core Objectives

1. **Automate visual inspection:** Reduce manual inspection effort through computer vision.
2. **Detect counterfeit markings:** Identify suspicious markings and surface modifications.
3. **Validate printed information:** Extract and validate Part numbers, Date codes, Manufacturer markings.
4. **Analyze physical geometry:** Use image-based geometric analysis to estimate dimensions and detect inconsistencies.
5. **Support offline operation:** Enable inspection in environments where internet connectivity may be unavailable.
6. **Support batch inspection:** Allow multiple ICs to be processed seamlessly.
7. **Produce traceable decisions:** Return an inspection result together with the evidence used to reach that decision.

## System Architecture

AuthentiChip can be viewed as five major layers:

```text
┌──────────────────────────────────────────────┐
│                 PRESENTATION                 │
│           Web-based Inspection UI            │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                  API LAYER                   │
│                   FastAPI                    │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             ORCHESTRATION LAYER              │
│       Inspection Workflow / Job Manager      │
└──────────────┬────────────┬──────────────────┘
               │            │
        ┌──────▼───────┐ ┌──▼──────────────┐
        │   Computer   │ │  OCR / Vision   │
        │    Vision    │ │  Intelligence   │
        │   Pipeline   │ │   MiniCPM-V 8   │
        └──────┬───────┘ └──────┬──────────┘
               │                │
               └───────┬────────┘
                       ▼
               ┌───────────────┐
               │Decision Engine│
               └───────┬───────┘
                       │
                       ▼
               ┌───────────────┐
               │    MongoDB    │
               └───────────────┘
```

## Inspection Pipeline

1. **Image Acquisition:** Uses a Raspberry Pi HQ Camera, custom 3D-printed testing jig, and custom ring lighting. Controlled imaging ensures consistent position, orientation, and illumination.
2. **Image Preprocessing:** Normalizes images (cropping, resizing, contrast normalization, perspective correction) to make downstream analysis more stable.
3. **Marking and Texture Analysis (HOG + SVM):** Extracts Histogram of Oriented Gradients (HOG) features and classifies them using a Support Vector Machine (SVM) to detect sanding, resurfacing, or blacktopping.
4. **OCR and Date-Code Validation (MiniCPM-V 8):** Extracts text, part numbers, and date codes to validate against expected component information.
5. **Dimensional Analysis (Homography):** Normalizes perspective to measure package dimensions and marking placement accurately.
6. **Manufacturer / Part-Number Validation:** Looks up extracted component identifiers against a local database.
7. **Multi-Model Decision Engine:** Aggregates scores from Texture, OCR, and Geometry pipelines.
8. **Final Authenticity Decision:** Returns PASS (strong evidence matches), REVIEW (conflicting evidence), or FAIL (multiple counterfeit indicators).

## Backend Architecture

- **FastAPI:** Acts as the service layer receiving inspection requests, running pipelines, and managing metadata.
- **Offline-First Design:** Crucial for industrial environments. Avoids network round trips, ensures security, and guarantees reliability.
- **Batch Processing:** Designed to handle multiple ICs as jobs.
- **Data Model:** Records store comprehensive evidence (`image_path`, `ocr_result`, `texture_result`, `geometry_result`, `final_result`) ensuring full traceability.

## Technology Stack

**Hardware:**
- Raspberry Pi HQ Camera
- Custom 3D-printed inspection jig
- Custom ring lighting

**Backend & AI:**
- Python, FastAPI, MongoDB
- HOG, Support Vector Machine
- MiniCPM-V 8 (OCR)
- Homography / geometric computer vision

**Frontend (This Repository):**
- **React 19 & Vite 7:** UI framework and build tool
- **Three.js & React Three Fiber:** Core 3D engine and React renderer
- **Tailwind CSS v4 & Framer Motion:** Styling and declarative animations
- **Lenis:** Smooth scroll behavior

## 3D Web Frontend (This Repository)

This repository contains the interactive 3D web application frontend for AuthentiChip. It provides an immersive 3D visualization of the hardware inspection rig (wcJIG and icJIG) directly on the webpage.

### Features of the Web App
- **Immersive 3D Visualization:** Real-time 3D rendering demonstrating the hardware setup.
- **Scroll-Driven Animations:** Utilizes scroll progress to animate 3D models (like 720° rotation).
- **Interactive Simulations:** Supports drag-and-drop interactions with the IC chip model.
- **Performance Optimized:** Efficient 3D asset loading.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aditay7/3d-Website-Authentichip.git
   cd 3d-Website-Authentichip
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Why a Multi-Model System?

Counterfeit detection is not a single visual classification problem. A model that only reads text would miss a fake IC with the right markings but wrong texture. A texture model might miss an invalid part number. Therefore, AuthentiChip combines independent evidence (Surface, Text, Geometry) to form a robust, hybrid verification system.

## Future Improvements

1. **Deep-learning anomaly detection:** Replace handcrafted HOG features with Vision Transformers or CNN autoencoders.
2. **Manufacturer-specific models:** Tailor verification to specific manufacturer fonts and layouts.
3. **Better uncertainty estimation:** Provide confidence scores alongside PASS/FAIL results.
4. **Human-in-the-loop verification:** Route suspicious components to human QA automatically.
5. **Automated conveyor integration:** Integrate the camera station directly into manufacturing lines.
6. **Digital inspection certificates:** Generate digitally traceable inspection records for every IC.

## Team

**HackFit Fam:**
- Pratyush Sarkar
- Aditay A.
- Piyush Soni
- Kumkum Jangid
- Karan Shrivastava

**Mentors:**
- Tushar Soni
- Anil Kumar

*Developed for the Smart India Hackathon 2025 Grand Finale.*

---

**Keywords:** Automated Optical Inspection, AOI, Counterfeit IC Detection, Computer Vision, Machine Learning, HOG, SVM, OCR, MiniCPM-V, Homography, FastAPI, MongoDB, Edge AI, Electronics Manufacturing, React Three Fiber, Three.js
