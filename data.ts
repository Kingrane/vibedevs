import { CategoryType, Prompt } from './types';

// Helper to create prompt objects cleanly
const createPrompt = (
    id: string,
    category: CategoryType,
    title: string,
    desc: string,
    content: string,
    tags: string[]
): Prompt => ({
  id,
  category,
  title,
  description: desc,
  code: content.trim(),
  tags
});

const promptsData: Prompt[] = [
  // --- WEB DESIGN ---
  createPrompt(
      "wd-01",
      CategoryType.WebDesign,
      "Modern Glassmorphism Landing Page",
      "Generates a high-conversion landing page structure with Tailwind CSS glassmorphism effects.",
      `Act as a Senior UI/UX Designer and Frontend Developer. 
    
Task: Create a responsive HTML/React component using Tailwind CSS for a SaaS landing page hero section.

Design Requirements:
1. Aesthetic: Dark mode, "Glassmorphism" (backdrop-blur, translucent borders), neon accent colors.
2. Structure: Navbar with logo/links, Hero Text (H1+Sub), CTA Buttons with hover effects, and a 3D abstract element placeholder on the right.
3. Accessibility: Ensure proper contrast ratios and ARIA labels.

Output: Provide the complete functional React component code.`,
      ["Tailwind", "UI/UX", "React"]
  ),
  createPrompt(
      "wd-02",
      CategoryType.WebDesign,
      "Accessible Color Palette Generator (JSON)",
      "Creates a semantic, accessible color system for web apps in JSON format.",
      `Act as an Accessibility Specialist.

Task: Generate a color palette for a modern web application in JSON format.
Constraint: All foreground/background combinations must pass WCAG AA standards.

Input Theme: "Cyberpunk Nature" (Neon Greens, Deep Browns, Slate Greys).

Output Format: JSON only.
Structure:
{
  "theme": "Cyberpunk Nature",
  "colors": {
    "primary": { "main": "hex", "contrast": "hex" },
    "secondary": { "main": "hex", "contrast": "hex" },
    "background": { "paper": "hex", "default": "hex" },
    "text": { "primary": "hex", "secondary": "hex" }
  }
}`,
      ["JSON", "A11y", "Colors"]
  ),
  createPrompt(
      "wd-03",
      CategoryType.WebDesign,
      "Bento Grid CSS Layout",
      "Generates a responsive Bento-style grid layout similar to Apple promotional pages.",
      `Act as a CSS Expert.

Task: Create a "Bento Grid" layout using CSS Grid.

Requirements:
1. Container: Responsive grid that switches from 1 column (mobile) to 4 columns (desktop).
2. Items: Cards that span different row/column sizes (e.g., span-2, row-span-2) to create a mosaic effect.
3. Styling: Rounded corners (xl), subtle borders, hover lift effect.
4. Output: Tailwind CSS HTML structure.`,
      ["CSS Grid", "Layout", "Bento"]
  ),

  // --- WEB PROGRAMMING ---
  createPrompt(
      "wp-01",
      CategoryType.WebProgramming,
      "Robust Data Fetching Hook",
      "A production-grade React hook for data fetching with caching, retry logic, and error handling.",
      `Act as a Senior React Developer.

Task: Write a custom React hook named 'useFetch' using TypeScript.

Requirements:
1. Accept a generic type T for response data.
2. Implement loading, error, and data states.
3. Include an AbortController to cancel requests on unmount.
4. Add a simple in-memory cache mechanism to avoid duplicate network calls for the same URL.
5. Provide a 'refetch' function exposed to the consumer.

Context: This is for a high-traffic dashboard application.`,
      ["React", "TypeScript", "Hooks"]
  ),
  createPrompt(
      "wp-02",
      CategoryType.WebProgramming,
      "Next.js API Route Handler (Zod Validation)",
      "Secure API route pattern with input validation and typed responses.",
      `Act as a Full Stack Engineer.

Task: Create a Next.js (App Router) API Route Handler (POST request).

Requirements:
1. Use 'zod' library to validate the request body (schema: email, password, age).
2. Return typed JSON responses (200 for success, 400 for validation error, 500 for server error).
3. Simulate a database delay using Promise.
4. Ensure proper TypeScript typing for the NextRequest and NextResponse.

Code Style: Clean, functional, and modular.`,
      ["Next.js", "Zod", "API"]
  ),
  createPrompt(
      "wp-03",
      CategoryType.WebProgramming,
      "Redux Toolkit Slices Setup",
      "Boilerplate for setting up a modern Redux store with async thunks.",
      `Act as a React State Management Expert.

Task: Set up a Redux Toolkit 'slice' for managing User Authentication.

Requirements:
1. Define the initial state (user, token, isLoading, error).
2. Create an async thunk 'loginUser' that mocks an API call.
3. Handle pending, fulfilled, and rejected cases in 'extraReducers' (builder syntax).
4. Export actions and the reducer.`,
      ["Redux", "State", "React"]
  ),

  // --- SHADERS ---
  createPrompt(
      "sh-01",
      CategoryType.Shaders,
      "GLSL Cyberpunk Grid Effect",
      "Generates a retro-futuristic moving grid floor shader for WebGL contexts.",
      `Act as a Graphics Engineer.

Task: Write a GLSL Fragment Shader for a "Synthwave" style moving grid floor.

Requirements:
1. Create a bright neon grid lines on a dark background.
2. The grid should appear to move towards the camera (using uTime).
3. Add a "fading horizon" effect where lines disappear into the distance (fog).
4. Use standard uniforms: uTime, uResolution.

Output: Provide the pure fragment shader code within a glsl block.`,
      ["GLSL", "WebGL", "Visuals"]
  ),
  createPrompt(
      "sh-02",
      CategoryType.Shaders,
      "Liquid Distortion Filter",
      "A post-processing effect that adds fluid-like distortion to an image.",
      `Act as a Technical Artist.

Task: Create a shader that applies a "water ripple" or liquid distortion effect to a texture.

Requirements:
1. Use sin/cos functions combined with uTime to displace UV coordinates.
2. Create a "chromatic aberration" effect by offsetting Red, Green, and Blue channels slightly differently based on the distortion.
3. Keep the code optimized for mobile devices.

Context: Used for a game menu background.`,
      ["GLSL", "Post-Processing", "Effects"]
  ),
  createPrompt(
      "sh-03",
      CategoryType.Shaders,
      "Raymarching Basic Sphere",
      "A simple raymarching implementation to render a 3D sphere without geometry.",
      `Act as a Shader Programmer.

Task: Write a GLSL fragment shader that implements basic Raymarching (Sphere Tracing).

Requirements:
1. Implement a Signed Distance Function (SDF) for a sphere.
2. Implement the raymarch loop (max steps 100, min distance 0.001).
3. Calculate normals based on the gradient of the SDF.
4. Apply simple diffuse lighting based on a fixed light source.`,
      ["GLSL", "Raymarching", "3D"]
  ),

  // --- PYTHON ---
  createPrompt(
      "py-01",
      CategoryType.Python,
      "FastAPI Microservice Boilerplate",
      "Sets up a production-ready FastAPI service with dependency injection and Pydantic models.",
      `Act as a Python Backend Lead.

Task: Scaffold a high-performance FastAPI application file.

Requirements:
1. Setup a standard GET endpoint '/' and a POST endpoint '/items'.
2. Use Pydantic V2 models for request/response validation.
3. Implement a custom dependency for database connection (mocked).
4. Include a middleware for processing time logging.
5. Add proper Type Hints and Docstrings for Swagger generation.`,
      ["Python", "FastAPI", "Backend"]
  ),
  createPrompt(
      "py-02",
      CategoryType.Python,
      "Async Web Scraper (aiohttp)",
      "Efficiently scrapes multiple URLs concurrently using Python's asyncio.",
      `Act as a Data Engineer.

Task: Write a Python script to scrape data from a list of URLs concurrently.

Requirements:
1. Use 'asyncio' and 'aiohttp'.
2. Limit concurrency to 5 requests at a time (use Semaphore).
3. Handle 429 (Too Many Requests) with exponential backoff retry logic.
4. Parse the HTML using 'BeautifulSoup' (mock the parsing logic).
5. Save results to a JSON file asynchronously.`,
      ["Python", "Scraping", "Async"]
  ),
  createPrompt(
      "py-03",
      CategoryType.Python,
      "PyTest Fixture Setup",
      "Advanced testing setup for database integration tests.",
      `Act as a QA Engineer.

Task: Write a conftest.py file for PyTest.

Requirements:
1. Create a fixture 'db_session' that spins up an in-memory SQLite database.
2. Ensure the fixture has a 'function' scope (resets per test).
3. Create a fixture 'auth_header' that returns a mock JWT token.
4. Show an example test case using these fixtures.`,
      ["Python", "Testing", "PyTest"]
  ),

  // --- JAVASCRIPT ---
  createPrompt(
      "js-01",
      CategoryType.JavaScript,
      "Advanced Array Manipulation Helpers",
      "A suite of utility functions for complex object array transformations.",
      `Act as a JavaScript Expert.

Task: Create a utility library for array manipulation without external dependencies (like Lodash).

Functions to implement:
1. 'groupBy(array, key)': Groups an array of objects by a specific property.
2. 'uniqueBy(array, key)': Removes duplicates based on a property.
3. 'pluck(array, key)': Extracts a list of values for a given key.
4. 'chunk(array, size)': Splits an array into smaller chunks.

Requirement: Use modern ES6+ syntax (arrow functions, reduce, Map, Set).`,
      ["ES6", "Utils", "Algorithms"]
  ),
  createPrompt(
      "js-02",
      CategoryType.JavaScript,
      "Custom Event Bus Implementation",
      "A lightweight pub/sub system for decoupled component communication.",
      `Act as a Software Architect.

Task: Implement a 'EventBus' class in vanilla JavaScript.

Features:
1. .on(event, callback): Subscribe to an event.
2. .off(event, callback): Unsubscribe.
3. .emit(event, data): Broadcast data to listeners.
4. .once(event, callback): Subscribe for one-time execution.

Constraint: Ensure memory safety (avoid memory leaks if callbacks are anonymous functions).`,
      ["Design Patterns", "Architecture", "VanillaJS"]
  ),
  createPrompt(
      "js-03",
      CategoryType.JavaScript,
      "Promise.allSettled Polyfill",
      "Implementation of Promise.allSettled for older environments.",
      `Act as a JS Core Developer.

Task: Write a polyfill for 'Promise.allSettled'.

Logic:
1. It should take an array of promises.
2. It should return a promise that resolves when all input promises have finished (either fulfilled or rejected).
3. The result should be an array of objects with { status: 'fulfilled', value } or { status: 'rejected', reason }.`,
      ["Polyfills", "Async", "Core JS"]
  ),

  // --- MACHINE LEARNING ---
  createPrompt(
      "ml-01",
      CategoryType.MachineLearning,
      "PyTorch Training Loop Skeleton",
      "A reusable, robust boilerplate for training neural networks in PyTorch.",
      `Act as an AI Researcher.

Task: Write a robust PyTorch training loop function.

Requirements:
1. Function signature: 'train_model(model, loader, criterion, optimizer, device)'.
2. Include a progress bar using 'tqdm'.
3. Track and return average loss and accuracy.
4. Implement "Gradient Clipping" to prevent exploding gradients.
5. Ensure the code handles moving data to GPU/CPU (device agnostic).`,
      ["PyTorch", "AI", "Training"]
  ),
  createPrompt(
      "ml-02",
      CategoryType.MachineLearning,
      "Explain Transformer Attention",
      "A conceptual breakdown of the Self-Attention mechanism for educational purposes.",
      `Act as a Computer Science Professor.

Task: Explain the "Self-Attention" mechanism in Transformers to a junior developer.

Requirements:
1. Use the analogy of "a database query" (Query, Key, Value).
2. Explain the mathematical formula Softmax(QK^T / sqrt(d)) * V step-by-step.
3. Provide a simplified Python code snippet (using NumPy) implementing the calculation.
4. Keep the tone academic but accessible.`,
      ["NLP", "Education", "Theory"]
  ),
  createPrompt(
      "ml-03",
      CategoryType.MachineLearning,
      "HuggingFace Inference Pipeline",
      "Script to run sentiment analysis using a pre-trained model.",
      `Act as an ML Engineer.

Task: Write a Python script using the 'transformers' library.

Steps:
1. Load a pre-trained sentiment analysis model (distilbert-base-uncased-finetuned-sst-2-english).
2. Create a pipeline object.
3. Run inference on a list of 5 different sentences.
4. Output the results (Label and Score) in a formatted table.`,
      ["HuggingFace", "NLP", "Inference"]
  ),

  // --- GAME DEV ---
  createPrompt(
      "gd-01",
      CategoryType.GameDev,
      "Unity FPS Controller (New Input System)",
      "Modern C# script for a first-person character controller in Unity.",
      `Act as a Unity Game Developer.

Task: Create a C# script 'PlayerController' for a First-Person Shooter.

Requirements:
1. Use Unity's 'Input System' (InputAction).
2. Implement WASD movement with CharacterController component.
3. Implement Mouse Look (Camera rotation with clamping on Y-axis).
4. Add Jump logic with gravity checks.
5. Variables should be exposed to the Inspector (Header, Tooltip).`,
      ["Unity", "C#", "Gameplay"]
  ),
  createPrompt(
      "gd-02",
      CategoryType.GameDev,
      "Godot 4.x State Machine Pattern",
      "A flexible State Machine implementation for managing character states in Godot.",
      `Act as a Godot Engine Expert.

Task: Implement a Hierarchical State Machine in GDScript for Godot 4.

Structure:
1. 'StateMachine' node (Manager).
2. 'State' base class (virtual methods: enter, exit, physics_update, handle_input).
3. Example usage: Create a 'PlayerIdle' and 'PlayerMove' state extending the base class.

Requirement: Use strong typing (class_name) and signal-based transitions.`,
      ["Godot", "GDScript", "Patterns"]
  ),
  createPrompt(
      "gd-03",
      CategoryType.GameDev,
      "Unreal Blueprint Logic Description",
      "Text-based description of a Blueprint logic for a door opening mechanic.",
      `Act as an Unreal Engine Developer.

Task: Describe the logic for a "Proximity Door" Blueprint.

Steps:
1. Component: Box Collision Trigger.
2. Event: OnComponentBeginOverlap -> Cast to PlayerCharacter.
3. Action: Timeline Node (Play from Start).
4. Timeline Update: Lerp (Linear Interpolation) the DoorMesh relative rotation from 0 to 90 degrees.
5. Event: OnComponentEndOverlap -> Timeline Node (Reverse).`,
      ["Unreal", "Blueprints", "Logic"]
  ),

  // --- DATA SCIENCE ---
  createPrompt(
      "ds-01",
      CategoryType.DataScience,
      "Automated EDA (Exploratory Data Analysis)",
      "Pandas script to generate a comprehensive summary of a dataset.",
      `Act as a Senior Data Analyst.

Task: Write a Python function 'perform_eda(df)' using Pandas and Seaborn.

Requirements:
1. Print basic info: Shape, DataTypes, Missing Values count.
2. Identify columns with high cardinality (>50 unique values).
3. Plot a Correlation Heatmap for numerical columns.
4. Plot Distribution (Histogram) for the top 3 numerical columns.
5. Handle exceptions if the dataframe is empty.`,
      ["Pandas", "Analysis", "Python"]
  ),
  createPrompt(
      "ds-02",
      CategoryType.DataScience,
      "SQL Complex Query Builder",
      "Constructs a high-performance SQL query for cohort analysis.",
      `Act as a Database Administrator.

Task: Write a complex SQL query (PostgreSQL syntax) for a SaaS "Retention Cohort Analysis".

Scenario:
- Table 'users' (id, created_at)
- Table 'activity' (user_id, active_date)

Goal:
1. Group users by their sign-up month (Cohort).
2. Calculate the % of users active in Month 0, Month 1, Month 2, etc. after signup.
3. Use Common Table Expressions (CTEs) for readability.`,
      ["SQL", "Analytics", "Database"]
  ),
  createPrompt(
      "ds-03",
      CategoryType.DataScience,
      "Scikit-Learn Pipeline",
      "End-to-end Machine Learning pipeline with preprocessing and model training.",
      `Act as a Data Scientist.

Task: Create a Scikit-Learn Pipeline for a classification task.

Steps:
1. Preprocessor: ColumnTransformer (Imputer + StandardScaler for numeric, OneHotEncoder for categorical).
2. Model: RandomForestClassifier.
3. GridSearch: Setup GridSearchCV to tune 'n_estimators' and 'max_depth'.
4. Code should fit the pipeline on X_train, y_train.`,
      ["Sklearn", "ML", "Python"]
  ),

  // --- MOBILE APPS ---
  createPrompt(
      "ma-01",
      CategoryType.MobileApps,
      "React Native Performance Optimization",
      "Checklist and code patterns to improve React Native list scrolling.",
      `Act as a Mobile Architect.

Task: Optimize a React Native 'FlatList' that renders 1000+ complex items.

Requirements:
1. Provide the code configuration for FlatList (windowSize, removeClippedSubviews).
2. Create a memoized Item component using React.memo.
3. Explain how to implement 'getItemLayout' to skip measurement calculations.
4. Explain the concept of "Bridge Crossing" reduction.`,
      ["React Native", "Performance", "Mobile"]
  ),
  createPrompt(
      "ma-02",
      CategoryType.MobileApps,
      "SwiftUI MVVM Boilerplate",
      "Clean architecture setup for an iOS screen using SwiftUI and Combine.",
      `Act as an iOS Lead Developer.

Task: Create a SwiftUI screen using the MVVM pattern.

Components:
1. 'UserViewModel': An ObservableObject fetching data from a service, exposing @Published properties (users, isLoading, error).
2. 'UserListView': A View observing the ViewModel.
3. Error handling: Display an Alert if the fetch fails.
4. Use Swift Concurrency (async/await) in the ViewModel.`,
      ["Swift", "iOS", "MVVM"]
  ),
  createPrompt(
      "ma-03",
      CategoryType.MobileApps,
      "Flutter Clean Architecture Widget",
      "Structure for a scalable Flutter widget separating UI and logic.",
      `Act as a Flutter Developer.

Task: Create a Flutter Widget using the BLoC pattern (conceptually).

Requirements:
1. Screen: 'WeatherScreen'.
2. BlocBuilder: Listens to WeatherStates (Initial, Loading, Loaded, Error).
3. UI: distinct widgets for each state (e.g., CircularProgressIndicator for Loading).
4. Code should be strictly typed.`,
      ["Flutter", "Dart", "Architecture"]
  ),

  // --- CYBERSECURITY ---
  createPrompt(
      "cs-01",
      CategoryType.Cybersecurity,
      "Web App Penetration Testing Checklist",
      "A methodical checklist for auditing a web application's security.",
      `Act as a White Hat Hacker / Pentester.

Task: Generate a comprehensive checklist for testing a login form's security.

Include:
1. SQL Injection vectors (Input fields).
2. XSS (Cross-Site Scripting) checks.
3. Brute-force protection analysis (Rate limiting).
4. Session Management (Cookie attributes: HttpOnly, Secure).
5. Error Message Information Leakage.

Output Format: Markdown list.`,
      ["Security", "Audit", "Pentesting"]
  ),
  createPrompt(
      "cs-02",
      CategoryType.Cybersecurity,
      "Secure Password Hashing (Python)",
      "Implementation of industry-standard password handling.",
      `Act as a Security Engineer.

Task: Write a Python module for handling user passwords securely.

Requirements:
1. Use 'argon2-cffi' or 'bcrypt' library (do NOT use md5 or sha256).
2. Function 'hash_password(plain)': Returns salt + hash.
3. Function 'verify_password(plain, hash)': Returns boolean.
4. Add comments explaining why these algorithms are chosen (Work factor, Salt).`,
      ["Python", "Crypto", "Security"]
  ),
  createPrompt(
      "cs-03",
      CategoryType.Cybersecurity,
      "Nmap Scan Command Generator",
      "Explanation of specific Nmap commands for network reconnaissance.",
      `Act as a NetSec Analyst.

Task: Explain the following Nmap command for a stealth scan.

Command: 'nmap -sS -A -T4 -p- <target_ip>'

Explain:
1. -sS (SYN Scan / Stealth).
2. -A (OS detection, version detection, script scanning, traceroute).
3. -T4 (Timing template).
4. -p- (Scan all 65535 ports).
5. Warning about legal implications.`,
      ["Networking", "Nmap", "Security"]
  ),

  // --- DEVOPS ---
  createPrompt(
      "do-01",
      CategoryType.DevOps,
      "Docker Multi-Stage Build (Node.js)",
      "Optimized Dockerfile for reducing image size of Node.js applications.",
      `Act as a DevOps Engineer.

Task: Write an optimized 'Dockerfile' for a Node.js API.

Stages:
1. 'Builder': Install dependencies, build the TypeScript code.
2. 'Runner': Use a minimal base image (alpine), copy only 'dist' and 'node_modules' (production only).

Best Practices:
- Use specific node versions (not 'latest').
- Run as a non-root user (USER node).
- Properly handle SIGTERM signals (tini or dumb-init).`,
      ["Docker", "Container", "Optimization"]
  ),
  createPrompt(
      "do-02",
      CategoryType.DevOps,
      "GitHub Actions CI/CD Pipeline",
      "YAML configuration for automated testing and deployment.",
      `Act as a CI/CD Expert.

Task: Create a .github/workflows/deploy.yml file.

Triggers: Push to 'main'.

Jobs:
1. 'Test': Run npm install, lint, and test. Cache node_modules.
2. 'Build': Build the Docker image.
3. 'Deploy': Push image to registry (mock step) and trigger a webhook.

Requirement: Use Secrets for credentials and ensure 'Deploy' only runs if 'Test' passes.`,
      ["GitHub Actions", "CI/CD", "Automation"]
  ),
  createPrompt(
      "do-03",
      CategoryType.DevOps,
      "Kubernetes Deployment Manifest",
      "Standard K8s deployment YAML with health checks.",
      `Act as a Cloud Engineer.

Task: Write a Kubernetes 'deployment.yaml' for a web service.

Requirements:
1. Replicas: 3.
2. Selector/Labels: app=web-service.
3. Resources: Requests (CPU 100m, Memory 128Mi) and Limits.
4. LivenessProbe: HTTP GET /healthz on port 8080.
5. ReadinessProbe: HTTP GET /ready on port 8080.`,
      ["Kubernetes", "K8s", "Infrastructure"]
  ),

  // --- AI TOOLS ---
  createPrompt(
      "ai-01",
      CategoryType.AITools,
      "System Instruction for Persona Adoption",
      "A meta-prompt to force an LLM to stay strictly in character.",
      `Act as a Prompt Engineer.

Task: Write a "System Instruction" for an LLM to act as a "Grumpy Senior Unix Admin".

Requirements:
1. Define the Tone: Cynical, terse, extremely knowledgeable but annoyed by simple questions.
2. Define Output Style: Lowercase, terminal-like brevity, frequent references to 'man pages'.
3. Constraints: Never break character, never apologize, refuse to help with GUI questions.

Format: Plain text block ready to be pasted into system config.`,
      ["Prompt Engineering", "Persona", "LLM"]
  ),
  createPrompt(
      "ai-02",
      CategoryType.AITools,
      "JSON Output Enforcer",
      "A prompt technique to ensure LLMs return parsable JSON only.",
      `Act as a Data Architect.

Task: Create a prompt wrapper that ensures an LLM extracts data as valid JSON.

Input: [Unstructured Text Email]

Instructions for LLM:
1. Extract 'sender_email', 'date', 'action_items' (list).
2. CRITICAL: Output MUST be valid JSON.
3. Do NOT include markdown formatting (\`\`\`json).
4. Do NOT include conversational filler ("Here is the JSON").
5. If data is missing, use null.`,
      ["JSON", "Data Extraction", "Automation"]
  ),
  createPrompt(
      "ai-03",
      CategoryType.AITools,
      "Chain-of-Thought Math Solver",
      "Prompt forcing the LLM to show its work step-by-step for complex logic.",
      `Act as a Math Tutor.

Task: Solve a word problem using Chain-of-Thought (CoT) reasoning.

Instructions:
1. Read the problem carefully.
2. Break it down into known variables.
3. Step-by-Step Execution: "First, I will calculate X... Then, I will multiply by Y..."
4. Double check the logic before stating the Final Answer.

Problem: "A train leaves Station A at 60mph..."`,
      ["CoT", "Reasoning", "Math"]
  )
];

export const ALL_PROMPTS = promptsData;

export const CATEGORIES_LIST = Object.values(CategoryType);
