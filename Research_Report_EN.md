# Reformer Pilates Tracker — Research & Knowledge Base

A comprehensive report covering Hevy app analysis, Reformer Pilates domain knowledge, and a feature mapping for a **Hevy-style tracker specialized for Reformer Pilates**.

---

## 1. Hevy App Deep Dive

### 1.1 Core Architecture — The Three Pillars

| Pillar | Description |
|---|---|
| **Workout Logging** | Real-time session tracking with sets, reps, weight, RPE, duration |
| **Progress Analytics** | Graphs, PRs, muscle-group analysis, body measurements |
| **Social / Community** | Follow friends, share workouts, leaderboards, comments |

### 1.2 Data Model

Hevy's data model flows: **User → Routines → Workouts → Exercises → Sets**

```text
User
├── Routines (reusable templates)
│   ├── Routine Name
│   ├── Exercises[]
│   │   ├── Exercise Template ID
│   │   ├── Sets[]  (target reps/weight ranges)
│   │   ├── Rest Timer (seconds)
│   │   └── Notes
│   └── Folder Organization
│
├── Workouts (logged sessions)
│   ├── Date, Duration, Name, Notes
│   ├── Exercises[]
│   │   ├── Exercise Template
│   │   ├── Sets[]
│   │   │   ├── Set Order
│   │   │   ├── Weight + Unit (kg/lb)
│   │   │   ├── Reps
│   │   │   ├── RPE (1-10)
│   │   │   ├── Duration (seconds)
│   │   │   ├── Distance + Unit
│   │   │   ├── Set Type: Normal | WarmUp | Failure | DropSet
│   │   │   └── Notes
│   │   └── Exercise Notes
│   └── Workout Notes
│
├── Exercise Templates (built-in + custom)
│   ├── Name, Muscle Groups, Equipment
│   ├── Instructions, Demo Animation
│   └── Personal History & PRs
│
└── Body Measurements & Progress Photos
```

### 1.3 Key Features Breakdown

#### Workout Logging
- Start from empty or select a routine template
- Add exercises from 400+ library (searchable, filterable by muscle/equipment)
- Log sets with weight, reps, RPE per set
- Set types: Normal, Warm-up, Drop Set, Failure
- Auto-populate previous workout values
- Automatic rest timers (customizable per exercise)
- Weight plate calculator
- Warm-up set calculator
- Exercise-level and set-level notes
- Supersets support (pairing exercises)
- Session duration auto-tracked

#### Routines & Programs
- Unlimited custom routines (reusable workout templates)
- 26 pre-built training programs, 8 categories
- Routines organized into folders
- Copy routines from other users
- Define target reps/weight ranges per set

#### Progress & Analytics
- Full-screen graphs for volume, best weight, total reps
- Personal Records (PR) live notifications
- Estimated 1RM calculation
- Muscle group activity charts / sets per muscle group per week
- Workout consistency streaks
- Body measurements tracking
- Progress photos
- Year-in-review summary
- Strength level comparison (Beginner→Elite by age/weight/sex)

#### Social Features
- Follow friends, view their workouts
- Like and comment on workouts
- Share/copy routines
- Social feed and leaderboards
- Strava integration

### 1.4 Hevy Coach (Instructor Features)

| Feature | Description |
|---|---|
| **Client Management** | Organized profiles, activity overview, assigned programs |
| **Workout Builder** | Create programs with exercises, sets, reps, rest periods |
| **Bulk Assignment** | Assign programs to multiple clients at once |
| **Live Session Logging** | Log client workouts during 1-on-1 sessions |
| **On-the-go Adjustments** | Swap exercises, add/remove sets, change set types |
| **Progress Dashboard** | Monitor client stats, measurements, body metrics |
| **Custom Exercise Library** | Create exercises with custom videos/hyperlinks |
| **In-app Chat** | Direct messaging with clients, image/video sharing |
| **Team Collaboration** | Build coaching teams with shared library |
| **Client Onboarding** | Invite via email, simple setup process |
| **Coach-only Notes** | Private notes per client |

### 1.5 UI/UX Design Principles

- Clean, minimal interface optimized for fast scanning
- Dark mode aesthetics with glowing effects
- Badge system and visual motivators
- Energetic yet simple design language
- Cross-platform: iOS, Android, Web, Apple Watch, Wear OS

---

## 2. Reformer Pilates — Domain Knowledge (🇹🇷 TR Focus)

### 2.1 What is Reformer Pilates?

Reformer Pilates is an exercise method performed on a specially designed machine ("reformer") using a **spring system** to provide resistance. Unlike mat pilates:

- Provides adjustable resistance through springs
- Activates both superficial and deep muscles
- Difficulty level can be customized per individual
- Joint-friendly, low-impact exercise form

### 2.2 Core Benefits

| Benefit | Detail |
|---|---|
| **Muscle Strengthening** | Balances all body muscles; especially core, back, glutes |
| **Increased Flexibility** | Supports joint health with full ROM exercises |
| **Posture Correction** | Improving spinal alignment, prevents slumping |
| **Rehabilitation** | Post-injury recovery with physiotherapist supervision |
| **Stress Reduction** | Mental relaxation with breathing techniques and concentration |
| **Body Shaping** | Creating a long, lean muscle structure |

### 2.3 Exercise Library — Basic Movements

#### Beginner Level
| Movement | Target Area | Description |
|---|---|---|
| **Footwork** | Leg, Glutes, Knee | Warm-up and lower body control |
| **The Hundred** | Core, Abdominals | Abdominal activation with breath control |
| **Mermaid** | Side Body | Stretch for flexibility and relaxation |
| **Leg Circles in Straps** | Glutes, Inner/Outer Thigh | Hip mobility |

#### Intermediate Level
| Movement | Target Area | Description |
|---|---|---|
| **Short Box Series** | Abdominals, Back, Spine | Spinal mobility |
| **Side Splits** | Glutes, Inner Thigh | Balance development |
| **Short Spine Massage** | Spine | Back lengthening, lower back relief |
| **Arm Work Series** | Arm, Shoulder | Upper body strengthening |
| **Rowing** | Arm, Back | Shoulder balance |

#### Advanced Level
| Movement | Target Area | Description |
|---|---|---|
| **Elephant** | Full Body, Core | Full body integration |
| **Long Stretch** | Full Body | Upper body + core |
| **Cobra** | Spine, Back | Advanced back workout |
| **Snake & Snake Twist** | Spine, Core | Spinal rotation |
| **Plank Variations** | Core | Core strengthening |

### 2.4 Spring System

The most important variable in Reformer Pilates is the **spring setting**. This is the equivalent of the "weight" concept in Hevy.

| Feature | Detail |
|---|---|
| **Color Coding** | Varies by brand (e.g., Balanced Body: Red=Heavy, Blue=Med, Yellow=Light) |
| **Resistance Levels** | Light, Medium, Heavy (usually a combo of 1-5 springs) |
| **Spring Combinations** | Different spring color/count combos determine exercise difficulty |
| **Personalization** | Instructor recommends spring setting based on individual level |

> **Important**: Incorrect spring choice can make the movement ineffective. Correct choice ensures maximum muscle activation.

### 2.5 Difficulty Levels

Progress: **Beginner → Intermediate → Advanced**

- **Beginner**: Basic movements, learning correct form
- **Intermediate**: Challenging yourself with variations, less spring support
- **Advanced**: Movements requiring high balance, strength, and control

### 2.6 Reformer Pilates Market in Turkey

| Data | Detail |
|---|---|
| **Global Market (2025)** | ~$630M (narrow) or ~$7.6B (broad estimate) |
| **Turkey's Share** | ~0.91% of global market (Middle East region is 5.10%) |
| **Growth Rate** | 8.2% CAGR (expected for 2025-2035) |
| **Studio Penetration** | "A studio in almost every neighborhood" |
| **Expansion** | 38% of studio owners plan to open a new location in 12 months |
| **Social Media** | High reach via "Pilates Girls" trend on TikTok |

### 2.7 Current Apps in Turkey

Existing apps in Turkey are largely focused on **studio management and reservation**, not **exercise tracking**:

| App | Focus |
|---|---|
| Reformer Pilates 24/7 | Studio access, membership management |
| Reformer Pilates Studio Duygu | Class info, package purchase |
| Reforme Pilates | Class booking, package purchase |
| Glow Reformer Pilates | Class schedule, registration |
| Reform Pilates | Booking, QR entry, measurement listing |
| Pilates Reformer Studio | Session booking, weekly schedule |

> [!IMPORTANT]
> **Market Gap**: None of the existing apps in Turkey offer Hevy-style **detailed exercise tracking, set/rep/spring logging, or progress analysis**. They are all booking systems. This is a major opportunity!

---

## 3. Feature Mapping: Hevy → Reformer Pilates Tracker

### 3.1 Direct Concept Translations

| Hevy Concept | Reformer Pilates Equivalent |
|---|---|
| Weight (kg/lb) | **Spring Setting** (color + count configuration) |
| Reps | **Reps** (stays the same) |
| Sets | **Sets** (stays the same) |
| RPE (1-10) | **RPE + Form Quality** (perceived exertion + form accuracy) |
| Exercise Library | **Reformer Move Library** (reformer-specific) |
| Muscle Groups | **Target Areas** (core, glutes, back, arm, leg...) |
| Equipment Filter | **Reformer Accessories** (box, strap, ring, jumpboard...) |
| Set Types (warm-up, etc.) | **Set Types** (warm-up, modified, advanced) |
| Routine | **Class Flow / Session Template** |
| Workout | **Session** (class/training log) |
| 1RM / PR | **Progress Metrics** (flexibility, spring progression, hold time) |
| Rest Timer | **Transition Time** (time between moves/positions) |

### 3.2 Reformer-Specific Features (Not in Hevy)

| Feature | Description |
|---|---|
| **Spring Configuration Logger** | Log exact spring combo per exercise (e.g., 1 Red + 1 Blue) |
| **Body Position Tracker** | Supine, prone, side-lying, sitting, standing, kneeling |
| **Hold Duration** | Time-under-tension for isometric holds (planks etc.) |
| **Range of Motion (ROM)** | Track flexibility improvements per exercise |
| **Carriage Position** | Starting/ending points on the reformer |
| **Accessory Used** | Box, jumpboard, platform extender, magic circle, straps |
| **Side Tracking** | Separate L/R side tracking for unilateral moves |
| **Form Quality Score** | Self-assessment or instructor-rated form quality (1-10) |
| **Breath Pattern Notes** | Inhale/exhale cue tracking |
| **Pain/Discomfort Log** | Track any discomfort for clinical pilates purposes |
| **Class Flow Builder** | Sequence exercises into a timed class format |

### 3.3 Proposed User Roles

| Role | Features |
|---|---|
| **Practitioner (User)** | Log personal sessions, track progress, view exercise library |
| **Instructor** | Build class flows, assign programs, manage clients, track progress |
| **Studio Owner** | Analytics dashboard, instructor management, client reports |

### 3.4 Progress Tracking Unique to Reformer Pilates

| Metric | How to Track |
|---|---|
| **Spring Progression** | Advancing to heavier (or less supportive) springs? |
| **Exercise Complexity** | Moving from beginner → advanced variations |
| **Flexibility / ROM** | Measured or self-reported range of motion improvements |
| **Session Consistency** | Workout streaks and frequency |
| **Body Balance** | Left vs Right side repetition/resistance comparison |
| **Posture Score** | Periodic self-assessment or instructor-rated |

---

## 4. Competitive Analysis Summary

| Feature | Hevy (Gym Focus) | Turkish Pilates Apps | **Our App (Gap to Fill)** |
|---|---|---|---|
| Detailed logging | ✅ | ❌ | ✅ |
| Spring/resistance tracking | N/A (Weight) | ❌ | ✅ |
| Exercise library (Demos) | ✅ (Gym) | ❌ | ✅ (Reformer-specific) |
| Progress analytics | ✅ | ❌ | ✅ |
| Routine/template system | ✅ | ❌ | ✅ (Class Flow Builder) |
| Class reservation | ❌ | ✅ | Optional (V3) |
| Instructor mode | ✅ (Hevy Coach) | ❌ | ✅ |
| Social features | ✅ | ❌ | Phase 2 Goal |

---

## 5. Recommended MVP Scope

### Phase 1 — Core Tracking
1. **Exercise Library** — Reformer database with level, muscles, springs, positions, accessories.
2. **Session Logging** — Real-time tracking with exercises, sets, reps, springs, holds, side tracking.
3. **Routine Builder** — Create reusable session/class templates.
4. **Progress Dashboard** — Charts for spring levels, consistency, and complexity advancement.
5. **User Profile** — Basic goals and bio.

### Phase 2 — Social & Instructor
6. **Instructor Mode** — Client management, assignment, monitoring.
7. **Social Feed** — Sharing sessions, following community.
8. **Advanced Analytics** — ROM tracking, posture scoring, balance analysis.

### Phase 3 — Expansion
9. **Booking Integration** — Connect to studio reservation APIs.
10. **Smartwatch Support** — Quick logging during class (esp. for instructors).
11. **AI Form Assistant** — Video-based feedback.

---

> [!TIP]
> **Key Insight**: There are **zero** dedicated exercise tracking apps for the Turkish Reformer Pilates market. All competition focuses on booking. A Hevy-style tracker for Reformer Pilates would be **the first in its category.**
