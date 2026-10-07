export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy-Medium' | 'Medium' | 'Medium-Hard';
  description: string;
  points: number;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  publicSample: { input: string; output: string }[];
  hiddenTestCases: { input: string; output: string; buggyOutput: string }[];
  buggyTemplates: Record<string, string>;
  solutionCheck: Record<string, string[]>;
}

export const problems: Problem[] = [
  {
    id: '1',
    title: 'Smart Water Tank Monitor',
    difficulty: 'Easy-Medium',
    points: 30,
    description: `A smart water tank has a sensor that reports the water level once every minute. The controller must identify how many readings are at or below the critical level and also report the minimum water level.`,
    inputFormat: `N\nL1 L2 ... LN\n\nN is the number of readings. Each Li is the water level percentage (0 to 100). The critical level is 20%.`,
    outputFormat: `Print two integers: the number of critical readings and the minimum level.`,
    constraints: `1 ≤ N ≤ 100000; 0 ≤ Li ≤ 100`,
    publicSample: [
      { input: `6\n75 18 22 10 45 20`, output: `3 10` }
    ],
    hiddenTestCases: [
      { input: `5\n100 90 80 70 60`, output: `0 60`, buggyOutput: `0 0` },
      { input: `4\n20 20 20 20`, output: `4 20`, buggyOutput: `4 0` },
      { input: `7\n0 5 10 15 19 21 30`, output: `5 0`, buggyOutput: `5 0` },
      { input: `1\n0`, output: `1 0`, buggyOutput: `1 0` },
      { input: `10\n21 22 23 24 25 26 27 28 29 30`, output: `0 21`, buggyOutput: `0 0` }
    ],
    buggyTemplates: {
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int critical = 0;\n        int minimum = 0; // BUG: Should this be 0?\n        \n        for (int i = 0; i < n; i++) {\n            int level = sc.nextInt();\n            if (level <= 20) {\n                critical++;\n            }\n            if (level < minimum) {\n                minimum = level;\n            }\n        }\n        System.out.println(critical + " " + minimum);\n    }\n}`,
      python: `def solve():\n    n = int(input())\n    levels = list(map(int, input().split()))\n    critical = 0\n    minimum = 0  # BUG: Should this be 0?\n    \n    for level in levels:\n        if level <= 20:\n            critical += 1\n        if level < minimum:\n            minimum = level\n            \n    print(f"{critical} {minimum}")\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {
      java: ['100', '101', 'Integer.MAX_VALUE'],
      python: ['100', '101', 'float(\'inf\')', 'math.inf']
    }
  },
  {
    id: '2',
    title: 'Poultry Farm Bird Counter',
    difficulty: 'Medium',
    points: 35,
    description: `A camera processes one row of bird detections. Each detection contains the bird's position on a one-dimensional conveyor. Two detections belonging to the same bird can be closer than or equal to 2 units. Count the number of distinct birds by grouping consecutive detections whose positions differ by at most 2.`,
    inputFormat: `N\nP1 P2 ... PN\n\nThe positions are given in non-decreasing order.`,
    outputFormat: `Print the number of distinct birds.`,
    constraints: `1 ≤ N ≤ 100000; 0 ≤ Pi ≤ 10^9; Pi ≤ Pi+1`,
    publicSample: [
      { input: `8\n10 11 12 20 21 35 36 50`, output: `4` }
    ],
    hiddenTestCases: [
      { input: `5\n1 2 3 4 5`, output: `1`, buggyOutput: `5` },
      { input: `6\n1 4 7 10 13 16`, output: `6`, buggyOutput: `6` },
      { input: `7\n10 10 11 30 31 50 52`, output: `4`, buggyOutput: `5` },
      { input: `1\n100`, output: `1`, buggyOutput: `1` },
      { input: `9\n1 3 4 10 12 13 20 25 26`, output: `5`, buggyOutput: `6` }
    ],
    buggyTemplates: {
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long prev = sc.nextLong();\n        int birds = 1;\n        for (int i = 1; i < n; i++) {\n            long current = sc.nextLong();\n            if (current - prev >= 2) { // BUG: Is this condition correct?\n                birds++;\n            }\n            prev = current;\n        }\n        System.out.println(birds);\n    }\n}`,
      python: `def solve():\n    n = int(input())\n    positions = list(map(int, input().split()))\n    \n    birds = 1\n    prev = positions[0]\n    \n    for i in range(1, n):\n        current = positions[i]\n        if current - prev >= 2: # BUG: Is this condition correct?\n            birds += 1\n        prev = current\n        \n    print(birds)\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {
      java: ['> 2', '>2'],
      python: ['> 2', '>2']
    }
  },
  {
    id: '3',
    title: 'Hospital IV Drip Alert',
    difficulty: 'Medium-Hard',
    points: 35,
    description: `A hospital device records the remaining IV fluid volume every 30 minutes. The nurse wants to know whether the IV needs attention. A reading is considered an alert when the remaining volume is below 25 mL. Calculate the number of alert readings and the total amount of fluid remaining across all readings.`,
    inputFormat: `N\nV1 V2 ... VN\n\nEach Vi is the remaining fluid volume in millilitres.`,
    outputFormat: `Print two integers: alert_count and total_volume.`,
    constraints: `1 ≤ N ≤ 100000; 0 ≤ Vi ≤ 1000`,
    publicSample: [
      { input: `5\n100 20 50 10 25`, output: `2 205` }
    ],
    hiddenTestCases: [
      { input: `4\n24 24 24 24`, output: `4 96`, buggyOutput: `4 96` },
      { input: `5\n25 30 40 50 60`, output: `0 205`, buggyOutput: `1 205` },
      { input: `1\n0`, output: `1 0`, buggyOutput: `1 0` },
      { input: `6\n1000 999 500 24 23 22`, output: `3 2568`, buggyOutput: `3 2568` },
      { input: `8\n10 20 25 26 0 100 24 25`, output: `4 230`, buggyOutput: `5 230` }
    ],
    buggyTemplates: {
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int alertCount = 0;\n        long total = 0;\n        for (int i = 0; i < n; i++) {\n            int volume = sc.nextInt();\n            total += volume;\n            if (volume <= 25) { // BUG: Check the scenario definition\n                alertCount++;\n            }\n        }\n        System.out.println(alertCount + " " + total);\n    }\n}`,
      python: `def solve():\n    n = int(input())\n    volumes = list(map(int, input().split()))\n    \n    alert_count = 0\n    total = 0\n    \n    for volume in volumes:\n        total += volume\n        if volume <= 25: # BUG: Check the scenario definition\n            alert_count += 1\n            \n    print(f"{alert_count} {total}")\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {
      java: ['< 25', '<25'],
      python: ['< 25', '<25']
    }
  }
];
