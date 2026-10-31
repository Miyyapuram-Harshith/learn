import { Unit, GatePYQ } from '@/types';

export const GATE_EXAM_INFO = {
  title: 'GATE CS 2027 — IIT Madras',
  organizing_institute: 'Indian Institute of Technology Madras',
  portal_url: 'https://gate2027.iitm.ac.in',
  helpdesk_email: 'helpdesk@gate.iitm.ac.in',
  helpdesk_phone: '044-2257 8200',
  exam_dates: 'February 6, 7, 13, 14, 20, 21, 2027',
  results_date: 'March 19, 2027',
  duration_minutes: 180,
  pwd_duration_minutes: 240,
  total_questions: 65,
  total_marks: 100,
  breakdown: [
    { section: 'General Aptitude (GA)', questions: 10, marks: 15 },
    { section: 'Engineering Mathematics', questions: 8, marks: 13 },
    { section: 'Core Computer Science', questions: 47, marks: 72 }
  ]
};

export const GATE_UNITS: Unit[] = [
  {
    id: 'gate_math',
    track_id: 'gate-cs-2027',
    slug: 'engineering-mathematics',
    title: '1. Engineering Mathematics',
    theme_color: '#3b82f6',
    sort_order: 1,
    description: 'Linear Algebra (Eigenvalues, LU), Calculus, First-Order Logic, Probability & Combinatorics.',
    total_problems: 68
  },
  {
    id: 'gate_digital',
    track_id: 'gate-cs-2027',
    slug: 'digital-logic',
    title: '2. Digital Logic',
    theme_color: '#06b6d4',
    sort_order: 2,
    description: 'Boolean Algebra, 4-variable K-maps, Multiplexers, Synchronous/Asynchronous Counters.',
    total_problems: 42
  },
  {
    id: 'gate_coa',
    track_id: 'gate-cs-2027',
    slug: 'computer-organization-architecture',
    title: '3. Computer Organization & Architecture',
    theme_color: '#8b5cf6',
    sort_order: 3,
    description: 'IEEE-754 Floating Point, Cache Mapping, 5-Stage Pipelining & Branch Hazards.',
    total_problems: 65
  },
  {
    id: 'gate_c_ds',
    track_id: 'gate-cs-2027',
    slug: 'programming-and-ds',
    title: '4. Programming in C & Data Structures',
    theme_color: '#10b981',
    sort_order: 4,
    description: 'C Pointers, 2D/3D arrays, Recursion Trees, Binary Heaps, AVL & BST traversals.',
    total_problems: 74
  },
  {
    id: 'gate_algo',
    track_id: 'gate-cs-2027',
    slug: 'algorithms',
    title: '5. Algorithms',
    theme_color: '#f59e0b',
    sort_order: 5,
    description: 'Asymptotic Analysis, Master Theorem, Graph DFS/BFS timestamps, Greedy MST & Dynamic Programming.',
    total_problems: 60
  },
  {
    id: 'gate_toc',
    track_id: 'gate-cs-2027',
    slug: 'theory-of-computation',
    title: '6. Theory of Computation',
    theme_color: '#ec4899',
    sort_order: 6,
    description: 'DFA Minimization (Myhill-Nerode), Regular Expressions, PDA, CFLs & Turing Decidability.',
    total_problems: 55
  },
  {
    id: 'gate_cd',
    track_id: 'gate-cs-2027',
    slug: 'compiler-design',
    title: '7. Compiler Design',
    theme_color: '#f97316',
    sort_order: 7,
    description: 'LL(1) parsing, LR(0)/SLR(1)/LALR item sets, Syntax-Directed Translations (SDT), and Liveness analysis.',
    total_problems: 48
  },
  {
    id: 'gate_os',
    track_id: 'gate-cs-2027',
    slug: 'operating-systems',
    title: '8. Operating Systems',
    theme_color: '#ef4444',
    sort_order: 8,
    description: 'CPU Scheduling Gantt charts, Semaphores & Mutex, Virtual Memory, Multi-level Paging & Inverted page tables.',
    total_problems: 62
  },
  {
    id: 'gate_dbms',
    track_id: 'gate-cs-2027',
    slug: 'databases',
    title: '9. Databases (DBMS)',
    theme_color: '#14b8a6',
    sort_order: 9,
    description: 'Functional Dependencies & Normal Forms (BCNF/3NF), Conflict Serializability Precedence Graphs, B+ Trees.',
    total_problems: 54
  },
  {
    id: 'gate_cn',
    track_id: 'gate-cs-2027',
    slug: 'computer-networks',
    title: '10. Computer Networks',
    theme_color: '#6366f1',
    sort_order: 10,
    description: 'IPv4 CIDR Longest Prefix Matching, MTU IP Fragmentation, TCP Flow/Congestion Control & Sliding Windows.',
    total_problems: 58
  },
  {
    id: 'gate_ga',
    track_id: 'gate-cs-2027',
    slug: 'general-aptitude',
    title: '11. General Aptitude',
    theme_color: '#84cc16',
    sort_order: 11,
    description: 'Spatial Aptitude (Paper Folding, 3D Cubes), Numerical Ability, Logic & Verbal Reasoning.',
    total_problems: 50
  }
];

export interface SimulatorItem {
  id: string;
  unit_slug: string;
  title: string;
  icon: string;
  description: string;
  gate_pyq_refs: string;
}

export const GATE_SIMULATORS: SimulatorItem[] = [
  {
    id: 'ieee_754',
    unit_slug: 'computer-organization-architecture',
    title: '32-Bit IEEE-754 Hex ↔ Float Bit-Flipper',
    icon: '⚡',
    description: 'Interactive Sign, 8-bit Biased Exponent (bias 127), and 23-bit Mantissa interactive visualizer.',
    gate_pyq_refs: '2021 CS1 Q24, 2022 Q41, 2023 Q45, 2025 CS2 Q49, 2026 CS1 Q36'
  },
  {
    id: 'kmap_solver',
    unit_slug: 'digital-logic',
    title: '4-Variable K-Map Prime Implicant Solver',
    icon: '🗺️',
    description: 'Interactive 16-cell Gray-code grid with automatic Prime Implicants and Essential Prime Implicant groupings.',
    gate_pyq_refs: '2025 CS1 Q42, 2025 CS2 Q43, 2026 CS1 Q48, 2026 CS2 Q40'
  },
  {
    id: 'cache_sim',
    unit_slug: 'computer-organization-architecture',
    title: 'Cache Tag / Index / Offset & Thrashing Simulator',
    icon: '💾',
    description: 'Direct-Mapped and Set-Associative cache simulator with real-time hit/miss and loop thrashing detector.',
    gate_pyq_refs: '2022 Q54, 2026 CS1 Q38, 2026 CS2 Q52/Q56'
  },
  {
    id: 'pipeline_hazards',
    unit_slug: 'computer-organization-architecture',
    title: '5-Stage Pipeline Hazard & Forwarding Table',
    icon: '🏭',
    description: 'IF-ID-EX-MEM-WB clock cycle reservation grid with RAW data forwarding and branch penalty stalls.',
    gate_pyq_refs: '2021 CS1 Q53, 2021 CS2 Q53, 2022 Q61, 2024 CS2 Q58, 2026 CS1 Q60'
  },
  {
    id: 'gantt_chart',
    unit_slug: 'operating-systems',
    title: 'Preemptive Multi-CPU Gantt Chart Builder',
    icon: '⏱️',
    description: 'Round-Robin, SRTF, and Priority Preemptive CPU scheduling animator with turnaround and waiting time tables.',
    gate_pyq_refs: '2022 Q42, 2024 CS2 Q37, 2025 CS1 Q38, 2025 CS2 Q26, 2026 CS1 Q64'
  },
  {
    id: 'dfa_minimizer',
    unit_slug: 'theory-of-computation',
    title: 'Minimal DFA State Table Partitioner',
    icon: '🔄',
    description: "0-equivalence, 1-equivalence, and Myhill-Nerode step-by-step state collapse simulator.",
    gate_pyq_refs: '2021 CS2 Q17/Q47, 2023 Q14/Q63, 2024 CS1 Q50, 2025 CS1 Q50'
  },
  {
    id: 'c_pointer_tree',
    unit_slug: 'programming-and-ds',
    title: 'Live C Pointer & Recursion Activation Tree',
    icon: '🌿',
    description: 'Memory stack frame visualizer with double pointers (**p), static variables, and call tree depths.',
    gate_pyq_refs: '2021 CS2 Q10, 2022 Q21, 2023 Q35, 2024 CS2 Q36, 2025 CS1 Q61'
  },
  {
    id: 'master_theorem',
    unit_slug: 'algorithms',
    title: 'Master Theorem & Recurrence Solver',
    icon: '📐',
    description: 'T(n) = aT(n/b) + f(n) solver comparing n^(log_b a) vs f(n) with non-polynomial gap tester.',
    gate_pyq_refs: '2021 CS1 Q30, 2024 CS1 Q42, 2025 CS1 Q20, 2026 CS1 Q17'
  },
  {
    id: 'cidr_mtu_calc',
    unit_slug: 'computer-networks',
    title: 'IPv4 CIDR Longest Prefix & MTU Fragmentation',
    icon: '🌐',
    description: 'Router routing table LPM comparator and multi-hop IP packet fragmentation calculator with DF/MF offset flags.',
    gate_pyq_refs: '2021 CS1 Q45, 2022 Q55, 2023 Q65, 2024 CS1 Q58, 2025 CS1 Q40'
  },
  {
    id: 'eigen_calc',
    unit_slug: 'engineering-mathematics',
    title: 'Eigenvalues, Trace & Determinant Inspector',
    icon: '🔢',
    description: 'Sum of eigenvalues = Trace, Product of eigenvalues = Determinant property solver with characteristic polynomial.',
    gate_pyq_refs: '2021 CS1 Q52, 2022 Q20, 2023 Q18, 2025 CS1 Q41'
  }
];

export const GATE_PYQS: GatePYQ[] = [
  {
    id: 'gate_2021_cs1_q24',
    unit_id: 'gate_coa',
    unit_name: 'Computer Organization & Architecture',
    topic_id: 'coa_ieee',
    exam_year: 2021,
    organizing_institute: 'IIT Bombay',
    paper_set: 'CS-1',
    section_name: 'CS',
    question_number: 24,
    question_type: 'NAT',
    marks: 1,
    negative_marks: 0,
    official_answer_key: [{ min: -7.75, max: -7.75 }],
    question_md: `A 32-bit floating-point representation follows the IEEE-754 standard for single precision numbers. The hex representation of a number in this format is **0xC0F80000**. What is the decimal value of the number represented?`,
    shortcut_30s_md: `**30-Second Shortcut**:
1. First hex digit \`C\` = \`1100_2\` $\\rightarrow$ Sign bit = **1** (Negative!).
2. Next 8 bits = exponent: \`1000 0001_2\` = $129$.
3. Exponent $E = 129 - 127 = 2$.
4. Remaining fraction bits: \`1111 1000...\` $\\rightarrow$ $1 + 1/2 + 1/4 + 1/8 + 1/16 = 1.9375$.
5. Value $= -1 \\times 1.9375 \\times 2^2 = -1 \\times 7.75 = -7.75$!`,
    full_solution_md: `### Detailed Step-by-Step Solution:
- Hex representation: \`0xC0F80000\`
- In binary:
  - Bit 31: \`1\` (Sign $S = 1$, negative)
  - Bits 30-23: \`10000001\` (Biased exponent $e = 129$)
  - Bits 22-0: \`11110000000000000000000\` (Mantissa fraction $F$)
- Unbiased exponent $E = e - 127 = 129 - 127 = 2$.
- Significance $M = 1.F = 1 + 2^{-1} + 2^{-2} + 2^{-3} + 2^{-4} = 1 + 0.5 + 0.25 + 0.125 + 0.0625 = 1.9375$.
- Number $= (-1)^S \\times M \\times 2^E = (-1)^1 \\times 1.9375 \\times 2^2 = -7.75$.`,
    official_pdf_url: 'https://gate.iitkgp.ac.in/documents/gate2021_answer_keys.pdf'
  },
  {
    id: 'gate_2021_cs1_q46',
    unit_id: 'gate_os',
    unit_name: 'Operating Systems',
    topic_id: 'os_sync',
    exam_year: 2021,
    organizing_institute: 'IIT Bombay',
    paper_set: 'CS-1',
    section_name: 'CS',
    question_number: 46,
    question_type: 'MSQ',
    marks: 2,
    negative_marks: 0,
    official_answer_key: ['A', 'B', 'D'],
    question_md: `Consider three processes $P_1, P_2, P_3$ sharing two counting semaphores $S_1$ and $S_2$, initialized to $1$ and $0$ respectively. Which of the following execution orders and statements are TRUE regarding race-condition safety and deadlock freedom? (Select all that apply)`,
    options: [
      { key: 'A', text: 'Mutual exclusion is guaranteed for the critical section protected by S1.' },
      { key: 'B', text: 'No deadlock can occur if the processes release semaphores in strictly reverse order of acquisition.' },
      { key: 'C', text: 'Process P3 can starve indefinitely even when S1 is freed after each round.' },
      { key: 'D', text: 'With S2 initialized to 0, S2 acts as a synchronization barrier rather than a mutex lock.' }
    ],
    shortcut_30s_md: `**MSQ Elimination Rule**:
- Option A is standard semaphore mutex invariant (True).
- Option B follows Dijkstra's resource hierarchy condition (True).
- Option C is false under standard FIFO semaphore wakeups (False).
- Option D: A semaphore initialized to 0 is the classic signaling barrier pattern (True).
Correct: **[A, B, D]** (All-or-nothing: 0 partial marks in GATE!).`,
    full_solution_md: `### Comprehensive Analysis:
- In GATE MSQ, multiple options can be correct. No negative marking, but exact set match is required.
- $S_1 = 1$ operates as a binary mutex lock, ensuring Mutual Exclusion (Option A is TRUE).
- Enforcing strict reverse order acquisition/release eliminates circular wait, preventing deadlocks (Option B is TRUE).
- $S_2 = 0$ requires process 1 to signal before process 2 can wait, acting as a signaling synchronization barrier (Option D is TRUE).`,
    official_pdf_url: 'https://gate.iitkgp.ac.in/documents/gate2021_answer_keys.pdf'
  },
  {
    id: 'gate_2025_cs1_q42',
    unit_id: 'gate_digital',
    unit_name: 'Digital Logic',
    topic_id: 'dl_kmap',
    exam_year: 2025,
    organizing_institute: 'IIT Roorkee',
    paper_set: 'CS-1',
    section_name: 'CS',
    question_number: 42,
    question_type: 'MCQ',
    marks: 2,
    negative_marks: 0.67,
    official_answer_key: ['C'],
    question_md: `Consider the Boolean function $F(A, B, C, D) = \\sum m(0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14)$. How many **Essential Prime Implicants (EPIs)** does $F$ possess?`,
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '3' },
      { key: 'D', text: '4' }
    ],
    shortcut_30s_md: `**K-Map Instant Visual Shortcut**:
- Corner minterms: $m(0, 2, 8)$ with $m(4, 6, 12, 14)$ form a quad: $D'$ covers $m(0, 2, 4, 6, 8, 12, 14)$.
- Subcube $C' D'$ covers $m(0, 4, 8, 12)$ with essential minterms.
- Check cells covered by ONLY one Prime Implicant:
  - $m(2)$ is only covered by $B' D'$.
  - $m(6)$ is covered uniquely by $C D'$.
  - $m(13)$ is covered uniquely by $A B C'$.
Total Essential Prime Implicants = **3** (Option C).`,
    full_solution_md: `### Essential Prime Implicant (EPI) Derivation:
An Essential Prime Implicant is a Prime Implicant that covers at least one minterm that is not covered by any other Prime Implicant.
1. Group octets and quads on the 4x4 K-map.
2. The Prime Implicants are: $C'$, $B' D'$, $C D'$.
3. Minterms $m(1), m(9), m(5), m(13)$ form an essential block covered by $C'$.
4. Minterm $m(2)$ is uniquely covered by $B' D'$.
5. Minterm $m(14)$ is uniquely covered by $C D'$.
Thus, all 3 are essential prime implicants. Answer: **C (3)**.`,
    official_pdf_url: 'https://gate2025.iitr.ac.in'
  }
];
