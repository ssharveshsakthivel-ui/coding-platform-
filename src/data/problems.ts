export interface Problem {
  id: string;
  title: string;
  round: number;
  difficulty: 'Easy' | 'Easy-Medium' | 'Medium' | 'Medium-Hard';
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
    id: '201',
    title: 'Add Two Numbers',
    round: 2,
    difficulty: 'Easy',
    points: 10,
    description: `Fix the compilation error so the program prints the correct sum of the two variables.`,
    inputFormat: `No input required.`,
    outputFormat: `Sum = 30`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `Sum = 30` }],
    hiddenTestCases: [{ input: ``, output: `Sum = 30`, buggyOutput: `Sum = 30` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 20;\n        int sum = a + b;\n\n        System.out.println("Sum = " + sm); // BUG\n    }\n}`,
      python: `def solve():\n    a = 10\n    b = 20\n    sum_val = a + b\n    print("Sum = " + str(sm)) # BUG\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '202',
    title: 'Even or Odd',
    round: 2,
    difficulty: 'Easy',
    points: 10,
    description: `Fix the syntax error in the conditional statement to check if the number is even or odd.`,
    inputFormat: `No input required.`,
    outputFormat: `Odd`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `Odd` }],
    hiddenTestCases: [{ input: ``, output: `Odd`, buggyOutput: `Even` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int n = 7;\n\n        if (n % 2 = 0) // BUG\n            System.out.println("Even");\n        else\n            System.out.println("Odd");\n    }\n}`,
      python: `def solve():\n    n = 7\n    if n % 2 = 0: # BUG\n        print("Even")\n    else:\n        print("Odd")\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '203',
    title: 'Find the Largest Number',
    round: 2,
    difficulty: 'Easy',
    points: 10,
    description: `Fix the logical error so the program prints the largest of the two numbers.`,
    inputFormat: `No input required.`,
    outputFormat: `Largest = 25`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `Largest = 25` }],
    hiddenTestCases: [{ input: ``, output: `Largest = 25`, buggyOutput: `Largest = 15` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int a = 25;\n        int b = 15;\n\n        if (a < b) // BUG\n            System.out.println("Largest = " + a);\n        else\n            System.out.println("Largest = " + b);\n    }\n}`,
      python: `def solve():\n    a = 25\n    b = 15\n    if a < b: # BUG\n        print(f"Largest = {a}")\n    else:\n        print(f"Largest = {b}")\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '204',
    title: 'Print Numbers 1 to 5',
    round: 2,
    difficulty: 'Easy',
    points: 10,
    description: `Fix the loop condition so the program prints numbers from 1 up to 5 inclusive.`,
    inputFormat: `No input required.`,
    outputFormat: `1\n2\n3\n4\n5`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `1\n2\n3\n4\n5` }],
    hiddenTestCases: [{ input: ``, output: `1\n2\n3\n4\n5`, buggyOutput: `1\n2\n3\n4` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i < 5; i++) { // BUG\n            System.out.println(i);\n        }\n    }\n}`,
      python: `def solve():\n    for i in range(1, 5): # BUG\n        print(i)\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '205',
    title: 'Calculate Average',
    round: 2,
    difficulty: 'Easy-Medium',
    points: 15,
    description: `Fix the operator precedence issue to correctly calculate the average of three numbers.`,
    inputFormat: `No input required.`,
    outputFormat: `Average = 20.0`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `Average = 20.0` }],
    hiddenTestCases: [{ input: ``, output: `Average = 20.0`, buggyOutput: `Average = 40.0` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 20;\n        int c = 30;\n\n        double average = a + b + c / 3; // BUG\n\n        System.out.println("Average = " + average);\n    }\n}`,
      python: `def solve():\n    a = 10\n    b = 20\n    c = 30\n    average = a + b + c / 3 # BUG\n    print(f"Average = {average:.1f}")\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '206',
    title: 'Reverse a Number',
    round: 2,
    difficulty: 'Easy-Medium',
    points: 15,
    description: `Fix the print statement so that it outputs the reversed number instead of 0.`,
    inputFormat: `No input required.`,
    outputFormat: `Reverse = 321`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `Reverse = 321` }],
    hiddenTestCases: [{ input: ``, output: `Reverse = 321`, buggyOutput: `Reverse = 0` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int n = 123;\n        int reverse = 0;\n\n        while (n > 0) {\n            int digit = n % 10;\n            reverse = reverse * 10 + digit;\n            n = n / 10;\n        }\n\n        System.out.println("Reverse = " + n); // BUG\n    }\n}`,
      python: `def solve():\n    n = 123\n    reverse_num = 0\n    while n > 0:\n        digit = n % 10\n        reverse_num = reverse_num * 10 + digit\n        n = n // 10\n    print(f"Reverse = {n}") # BUG\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '207',
    title: 'Array Sum',
    round: 2,
    difficulty: 'Easy-Medium',
    points: 15,
    description: `Fix the out of bounds error in the loop to compute the sum of the array.`,
    inputFormat: `No input required.`,
    outputFormat: `Sum = 100`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `Sum = 100` }],
    hiddenTestCases: [{ input: ``, output: `Sum = 100`, buggyOutput: `Error` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30, 40};\n        int sum = 0;\n\n        for (int i = 0; i <= numbers.length; i++) { // BUG\n            sum = sum + numbers[i];\n        }\n\n        System.out.println("Sum = " + sum);\n    }\n}`,
      python: `def solve():\n    numbers = [10, 20, 30, 40]\n    sum_val = 0\n    for i in range(len(numbers) + 1): # BUG\n        sum_val += numbers[i]\n    print(f"Sum = {sum_val}")\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '208',
    title: 'Palindrome Number',
    round: 2,
    difficulty: 'Medium',
    points: 20,
    description: `Fix the condition to properly verify if the original number is a palindrome.`,
    inputFormat: `No input required.`,
    outputFormat: `Palindrome`,
    constraints: `None`,
    publicSample: [{ input: ``, output: `Palindrome` }],
    hiddenTestCases: [{ input: ``, output: `Palindrome`, buggyOutput: `Not Palindrome` }],
    buggyTemplates: {
      java: `public class Main {\n    public static void main(String[] args) {\n        int n = 121;\n        int original = n;\n        int reverse = 0;\n\n        while (n > 0) {\n            int digit = n % 10;\n            reverse = reverse * 10 + digit;\n            n = n / 10;\n        }\n\n        if (original == n) // BUG\n            System.out.println("Palindrome");\n        else\n            System.out.println("Not Palindrome");\n    }\n}`,
      python: `def solve():\n    n = 121\n    original = n\n    reverse_num = 0\n    while n > 0:\n        digit = n % 10\n        reverse_num = reverse_num * 10 + digit\n        n = n // 10\n    if original == n: # BUG\n        print("Palindrome")\n    else:\n        print("Not Palindrome")\n\nif __name__ == "__main__":\n    solve()`
    },
    solutionCheck: {}
  },
  {
    id: '301',
    title: 'Smart Water Tank Monitor',
    round: 3,
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
    id: '302',
    title: 'Poultry Farm Bird Counter',
    round: 3,
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
    id: '303',
    title: 'Hospital IV Drip Alert',
    round: 3,
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
