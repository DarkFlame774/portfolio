export const SKILL_TREE_ROOT = {
  id: 'cse',
  label: 'Computer Science',
  icon: 'cpu',
  x: 50, y: 50,
  isRoot: true,
  desc: 'Core foundation in Computer Science Engineering, bridging low-level systems with high-level architecture.',
  children: [
    {
      id: 'languages',
      label: 'Languages',
      icon: 'code',
      x: 50, y: 22,
      children: [
        { id: 'cpp', label: 'C++', proficiency: 'Proficient', desc: 'Systems-level programming with deep understanding of memory management, pointers, templates, and low-level optimization.', usedIn: 'Custom Game Engine (BAD), Console Tetris', icon: 'cpu', x: 34, y: 12 },
        { id: 'csharp', label: 'C#', proficiency: 'Proficient', desc: 'Object-oriented development for game systems, scripting, and application frameworks.', usedIn: 'Tower Defense Game (Unity), Game Dev mentoring', icon: 'braces', x: 50, y: 8 },
        { id: 'python', label: 'Python', proficiency: 'Familiar', desc: 'Scripting for automation, integrations, and rapid prototyping.', usedIn: 'Hackathon projects, automation scripts', icon: 'terminal', x: 66, y: 12 },
      ]
    },
    {
      id: 'gamedev',
      label: 'Game Dev',
      icon: 'gamepad',
      x: 22, y: 50,
      children: [
        { id: 'unity', label: 'Unity', proficiency: 'Proficient', desc: 'Full game development lifecycle — physics, pathfinding, spawn systems, OOP architecture.', usedIn: 'Tower Defense Game (failed-defenders)', icon: 'box', x: 12, y: 34 },
        { id: 'engine', label: 'Engine Design', proficiency: 'Proficient', desc: 'Modular engine design with application frameworks, logging systems, build pipelines, and external library integration.', usedIn: 'Custom Game Engine (BAD) — Premake, GLFW', icon: 'cog', x: 8, y: 50 },
        { id: 'blender', label: 'Blender', proficiency: 'Familiar', desc: 'Basic 3D modeling and asset creation for game projects.', usedIn: 'Game asset prototyping', icon: 'shapes', x: 12, y: 66 },
      ]
    },
    {
      id: 'backend',
      label: 'Backend',
      icon: 'server',
      x: 78, y: 50,
      children: [
        { id: 'node', label: 'Node.js', proficiency: 'Comfortable', desc: 'Server-side JavaScript runtime for building scalable network applications.', usedIn: 'Backend projects, hackathon entries', icon: 'server', x: 88, y: 34 },
        { id: 'express', label: 'Express.js', proficiency: 'Comfortable', desc: 'Minimal web framework for building RESTful APIs and server applications.', usedIn: 'API development projects', icon: 'route', x: 92, y: 50 },
        { id: 'mongo', label: 'MongoDB', proficiency: 'Comfortable', desc: 'NoSQL document database for flexible data modeling.', usedIn: 'Full-stack hackathon projects', icon: 'database', x: 88, y: 66 },
      ]
    },
    {
      id: 'tools',
      label: 'Tools & DevOps',
      icon: 'wrench',
      x: 50, y: 78,
      children: [
        { id: 'git', label: 'Git & GitHub', proficiency: 'Proficient', desc: 'Version control, branching strategies, collaboration workflows, and repository management.', usedIn: 'All projects — DarkFlame774 on GitHub', icon: 'gitBranch', x: 34, y: 88 },
        { id: 'vs', label: 'Visual Studio', proficiency: 'Proficient', desc: 'Full IDE proficiency including debugging with breakpoints, memory inspection, and profiling.', usedIn: 'C++ engine development, C# Unity projects', icon: 'monitor', x: 50, y: 92 },
        { id: 'debug', label: 'Debugging (gdb)', proficiency: 'Comfortable', desc: 'Command-line debugging, memory analysis, and assembly-level inspection for x86 architecture.', usedIn: 'Low-level C++ debugging, OS coursework', icon: 'bug', x: 66, y: 88 },
      ]
    }
  ]
};