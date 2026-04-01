# 🧱 Build Your Stack

A visual, drag-and-drop tech stack architecture designer with AI-powered analysis. Design your system architecture, get instant insights, and share it with a single link.

![Build Your Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![React Flow](https://img.shields.io/badge/React-Flow-FF0072?style=flat-square)

---

## ✨ Features

- **Drag & Drop Canvas** — Drag frontend, backend, database, auth, and hosting components onto a visual canvas
- **Visual Connections** — Connect nodes with animated edges to define your data flow
- **Live Stack Analysis** — Instant pros/cons, conflict detection, complexity scoring, and use case matching as you build
- **AI-Powered Insights** — On-demand architecture analysis, scalability assessment, and personalized learning recommendations
- **Save & Share** — Persist stacks to Firebase and generate unique shareable URLs (`/stack/:id`)
- **My Stacks Page** — Browse, search, and manage all your saved architectures
- **Stack Templates** — Load pre-built architectures (MERN, Next.js SaaS, Firebase MVP, and more)
- **Stack Comparison** — Build two stacks side by side and get a live diff analysis
- **Export as PNG** — Download your architecture diagram as a high-resolution image
- **Search Components** — Filter the sidebar component palette in real time

---

## 🖥️ Demo

> Build → Analyze → Share → Compare

| Builder | Analysis | Shared View |
|---|---|---|
| Drag components onto canvas | Live pros/cons + AI insights | Read-only view via shareable link |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (Vite plugin) |
| Canvas / Diagram | React Flow v12 (`@xyflow/react`) |
| Database | Firebase Firestore |
| Auth (optional) | Firebase Authentication |
| AI Analysis | Groq API (Llama 3.3 70B) or Google Gemini |
| Export | `html-to-image` |
| Routing | React Router v6 |
| Typography | Syne + Geist + JetBrains Mono |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── CanvasToolbar.jsx     # Floating toolbar (save, export, templates)
│   │   ├── StackCanvas.jsx       # React Flow canvas with drag/drop
│   │   └── StackNode.jsx         # Custom node component
│   ├── comparison/
│   │   └── ComparisonDiff.jsx    # Side-by-side stack diff panel
│   ├── layout/
│   │   ├── AppShell.jsx          # Root layout, modal orchestration
│   │   ├── DetailsPanel.jsx      # Right panel — static + AI analysis
│   │   └── Sidebar.jsx           # Component palette with search
│   └── ui/
│       ├── AiAnalyzeButton.jsx   # AI trigger button with states
│       ├── AiAnalysisResult.jsx  # Structured AI response renderer
│       ├── AuthButton.jsx        # Google sign-in / user avatar
│       ├── ComponentCard.jsx     # Draggable sidebar item
│       ├── SaveModal.jsx         # Stack title input modal
│       ├── ShareModal.jsx        # Shareable URL + copy button
│       ├── StackCard.jsx         # My Stacks page card
│       ├── TemplatesModal.jsx    # Template picker grid
│       └── ToastContainer.jsx    # Toast notification system
├── data/
│   ├── stackComponents.js        # All draggable tech components
│   └── stackTemplates.js         # Pre-built stack templates
├── hooks/
│   ├── useAiAnalysis.js          # AI call lifecycle + cooldown
│   ├── useAuth.js                # Firebase Auth state
│   ├── useComparisonStore.js     # Two independent canvas stores
│   ├── useExport.js              # PNG export handler
│   ├── useSavedStacks.js         # Fetch user's stacks from Firestore
│   ├── useSaveStack.js           # Save flow with loading/error state
│   ├── useStackAnalysis.js       # Reactive static analysis hook
│   ├── useStackStore.js          # Canvas nodes/edges state
│   └── useToast.js               # Zero-dependency toast system
├── pages/
│   ├── ComparePage.jsx           # Side-by-side comparison layout
│   ├── HomePage.jsx              # Main builder page
│   ├── MyStacksPage.jsx          # Saved stacks gallery
│   └── StackPage.jsx             # Read-only shared stack view
├── services/
│   ├── aiService.js              # Groq / Gemini API call
│   └── firebase.js               # Firestore + Auth initialization
│   └── stackService.js           # All Firestore CRUD operations
└── utils/
    ├── buildAiPrompt.js          # Prompt engineering for AI analysis
    ├── exportDiagram.js          # html-to-image canvas export
    ├── stackAnalyzer.js          # Pure stack analysis engine
    ├── stackKnowledge.js         # Per-tech pros/cons/conflicts knowledge base
    └── useCaseTemplates.js       # Use case scoring templates
```


```

## 🧩 Supported Components

| Category | Components |
|---|---|
| Frontend | React, Vue, Next.js, Svelte |
| Backend | Node.js, Express, Django, FastAPI |
| Database | MongoDB, PostgreSQL, Firebase, Supabase |
| Auth | Firebase Auth, Auth0, Clerk |
| Hosting | Vercel, Netlify, AWS, Railway |

---

## 🤖 AI Analysis

The AI analysis is triggered **on demand** (not on every canvas change) to avoid unnecessary API calls. It generates:

- **Architecture Summary** — contextual description of your specific combination
- **Scalability Rating** — Good / Moderate / Poor with a specific bottleneck note
- **AI-Identified Strengths** — combination-specific, not just per-tool
- **Architectural Concerns** — honest trade-offs for your exact stack
- **Actionable Suggestions** — concrete improvements, not vague advice
- **Learn Next** — numbered roadmap of skills to learn for this stack

A 30-second cooldown prevents repeated calls.

---

## 📐 Architecture Decisions

**Why no traditional backend?**
Firebase Firestore handles persistence directly from the client. This keeps the stack lean and removes the need to maintain a server for a portfolio-scale project.

**Why a service layer (`/services`)?**
All Firebase and AI API calls live in service files. Components never call `addDoc` or `fetch` directly. Swapping providers means changing one file, not ten components.

**Why pure utility functions (`/utils`)?**
`stackAnalyzer.js` is a pure function — data in, analysis out. Zero React dependency. Easy to unit test, reuse in the comparison view, and replace with AI output in Phase 7.

**Why on-demand AI?**
The static analyzer runs instantly on every canvas change. AI runs only when the user clicks the button — avoiding token costs on every drag interaction.

---

## 🗺️ Routes

| Route | Description |
|---|---|
| `/` | Main builder — drag, drop, connect, analyze |
| `/stack/:id` | Read-only shared stack view |
| `/my-stacks` | Gallery of your saved stacks |
| `/compare` | Side-by-side stack comparison |

---

## 🔮 Possible Extensions

- [ ] User authentication with per-user stack isolation
- [ ] Stack versioning — save multiple versions of the same architecture
- [ ] Comments on shared stacks
- [ ] Public gallery — browse community stacks
- [ ] Custom components — add your own tech to the palette
- [ ] Stack rating system
- [ ] PDF export with analysis report
- [ ] Embed widget for blog posts

---

## 📦 Key Dependencies

```json
{
  "@xyflow/react": "^12.x",
  "firebase": "^10.x",
  "react-router-dom": "^6.x",
  "html-to-image": "^1.x",
  "tailwindcss": "^4.x",
  "clsx": "^2.x",
  "uuid": "^9.x"
}
```

---

## 🧑‍💻 Author

Built by **Rishabh Srivastava** as a portfolio project demonstrating:

- React architecture and custom hooks
- React Flow canvas and drag-and-drop systems
- Firebase Firestore integration
- REST API integration and prompt engineering
- Production UI/UX patterns with Tailwind CSS
- Client-side routing with React Router

---

