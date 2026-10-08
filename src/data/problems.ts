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
    title: 'Student Marks Calculator',
    round: 2,
    difficulty: 'Easy',
    points: 10,
    description: `Write a program that reads the marks of three subjects and calculates the total marks and average marks.`,
    inputFormat: `Three integers representing marks`,
    outputFormat: `Total = [total]\nAverage = [average]`,
    constraints: `None`,
    publicSample: [{ input: `80 75 90`, output: `Total = 245\nAverage = 81.67` }],
    hiddenTestCases: [
      { input: `50 60 70`, output: `Total = 180\nAverage = 60.00`, buggyOutput: `Total = 180\nAverage = 60` },
      { input: `95 88 92`, output: `Total = 275\nAverage = 91.67`, buggyOutput: `Total = 275\nAverage = 91` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int math, science, english\n    cin >> maths >> science >> english;\n\n    int total = math + science + English;\n    float average = total / 3;\n\n    cout << "Total = " << total << endl;\n    cout << fixed << setprecision(2);\n    cout << "Average = " << average << endl\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int math, science, english\n        math = sc.nextInt();\n        science = sc.nextInt();\n        english = sc.nextInt();\n\n        int total = math + science + English;\n        float average = total / 3;\n\n        System.out.println(\"Total = \" + total);\n        System.out.printf(\"Average = %.2f\\n\", average)\n    }\n}",
      python: "def main():\n    math, science, english = map(int, input().split())\n    \n    total = math + science + English\n    average = total / 3\n    \n    print(f\"Total = {total}\")\n    print(f\"Average = {average:.2f}\")\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  },
  {
    id: '202',
    title: 'Simple Calculator',
    round: 2,
    difficulty: 'Easy',
    points: 10,
    description: `Write a program that takes two integers and prints their sum, difference, and product.`,
    inputFormat: `Two integers`,
    outputFormat: `Sum = [sum]\nDifference = [diff]\nProduct = [prod]`,
    constraints: `None`,
    publicSample: [{ input: `10 5`, output: `Sum = 15\nDifference = 5\nProduct = 50` }],
    hiddenTestCases: [
      { input: `7 3`, output: `Sum = 10\nDifference = 4\nProduct = 21`, buggyOutput: `Sum = 10\nDifference = 4\nProduct = 21` },
      { input: `12 8`, output: `Sum = 20\nDifference = 4\nProduct = 96`, buggyOutput: `Sum = 20\nDifference = 4\nProduct = 96` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> c;\n\n    int sum = a + b;\n    int difference = a - b\n    int product = a * B;\n\n    cout << "Sum = " << sum << endl;\n    cout << "Difference = " << difference << endl;\n    cout << "Product = " << product << endl;\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n\n        int sum = a + b;\n        int difference = a - b\n        int product = a * B;\n\n        System.out.println(\"Sum = \" + sum);\n        System.out.println(\"Difference = \" + difference);\n        System.out.println(\"Product = \" + product);\n    }\n}",
      python: "def main():\n    a, b = map(int, input().split())\n    \n    sum_val = a + b\n    difference = a - b\n    product = a * B\n    \n    print(f\"Sum = {sum_val}\")\n    print(f\"Difference = {difference}\")\n    print(f\"Product = {product}\")\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  },
  {
    id: '203',
    title: 'Positive, Negative or Zero',
    round: 2,
    difficulty: 'Easy',
    points: 10,
    description: `Write a program that reads an integer and determines whether the number is positive, negative, or zero.`,
    inputFormat: `An integer`,
    outputFormat: `Positive / Negative / Zero`,
    constraints: `None`,
    publicSample: [{ input: `25`, output: `Positive` }],
    hiddenTestCases: [
      { input: `-10`, output: `Negative`, buggyOutput: `Negative` },
      { input: `0`, output: `Zero`, buggyOutput: `Zero` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int number\n    cin >> num;\n\n    if (number > 0) {\n        cout << "Positive" << endl;\n    }\n    else if (number < 0) {\n        cout << "Negative" << endl\n    }\n    else {\n        cout << "Zero";\n    }\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int number\n        int num = sc.nextInt();\n\n        if (number > 0) {\n            System.out.println(\"Positive\");\n        }\n        else if (number < 0) {\n            System.out.println(\"Negative\")\n        }\n        else {\n            System.out.print(\"Zero\");\n        }\n    }\n}",
      python: "def main():\n    num = int(input())\n    \n    if number > 0:\n        print(\"Positive\")\n    elif number < 0:\n        print(\"Negative\")\n    else:\n        print(\"Zero\")\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  },
  {
    id: '204',
    title: 'Pattern Printing',
    round: 2,
    difficulty: 'Easy',
    points: 15,
    description: `Given an integer N, print the right-angled triangle pattern containing N rows.`,
    inputFormat: `An integer N`,
    outputFormat: `Pattern`,
    constraints: `N >= 1`,
    publicSample: [{ input: `3`, output: `*\n**\n***` }],
    hiddenTestCases: [
      { input: `4`, output: `*\n**\n***\n****`, buggyOutput: `*\n**\n***` },
      { input: `5`, output: `*\n**\n***\n****\n*****`, buggyOutput: `*\n**\n***\n****` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j < i; j++) {\n            cout << "*";\n        }\n        cout << endl;\n    }\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j < i; j++) {\n                System.out.print(\"*\");\n            }\n            System.out.println();\n        }\n    }\n}",
      python: "def main():\n    n = int(input())\n    \n    for i in range(1, n + 1):\n        for j in range(1, i):\n            print(\"*\", end=\"\")\n        print()\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  },
  {
    id: '205',
    title: 'Third Largest Element',
    round: 2,
    difficulty: 'Medium',
    points: 15,
    description: `Given an array of integers, find and print the third largest distinct element in the array.`,
    inputFormat: `N, followed by N integers`,
    outputFormat: `Third largest element`,
    constraints: `N >= 3`,
    publicSample: [{ input: `6\n10 5 20 8 15 25`, output: `15` }],
    hiddenTestCases: [
      { input: `7\n12 45 7 23 19 50 31`, output: `31`, buggyOutput: `31` },
      { input: `6\n10 20 20 5 30 15`, output: `15`, buggyOutput: `15` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\n#include <climits>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    int arr[n];\n\n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n\n    int largest = INT_MIN;\n    int secondLargest = INT_MIN;\n    int thirdLargest = INT_MIN;\n\n    for (int i = 0; i < n; i++) {\n        if (arr[i] > largest) {\n            largest = arr[i];\n        }\n        else if (arr[i] > secondLargest) {\n            secondLargest = arr[i];\n        }\n        else if (arr[i] > thirdLargest) {\n            thirdLargest = arr[i];\n        }\n    }\n\n    cout << thirdLargest << endl;\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n\n        int largest = Integer.MIN_VALUE;\n        int secondLargest = Integer.MIN_VALUE;\n        int thirdLargest = Integer.MIN_VALUE;\n\n        for (int i = 0; i < n; i++) {\n            if (arr[i] > largest) {\n                largest = arr[i];\n            }\n            else if (arr[i] > secondLargest) {\n                secondLargest = arr[i];\n            }\n            else if (arr[i] > thirdLargest) {\n                thirdLargest = arr[i];\n            }\n        }\n\n        System.out.println(thirdLargest);\n    }\n}",
      python: "import sys\n\ndef main():\n    n = int(input())\n    arr = list(map(int, input().split()))\n    \n    largest = -sys.maxsize\n    secondLargest = -sys.maxsize\n    thirdLargest = -sys.maxsize\n    \n    for num in arr:\n        if num > largest:\n            largest = num\n        elif num > secondLargest:\n            secondLargest = num\n        elif num > thirdLargest:\n            thirdLargest = num\n            \n    print(thirdLargest)\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  },
  {
    id: '206',
    title: 'Reverse a String Using Two Pointers',
    round: 2,
    difficulty: 'Medium',
    points: 15,
    description: `Given a string, reverse it in-place using the two-pointer technique.`,
    inputFormat: `A string`,
    outputFormat: `Reversed string`,
    constraints: `None`,
    publicSample: [{ input: `HELLO`, output: `OLLEH` }],
    hiddenTestCases: [
      { input: `PROGRAM`, output: `MARGORP`, buggyOutput: `MARGORP` },
      { input: `DEBUG`, output: `GUBED`, buggyOutput: `GUBED` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string str;\n    cin >> str;\n\n    int left = 0;\n    int right = str.length() - 1;\n\n    while (left < right) {\n        swap(str[left], str[right]);\n\n        left++;\n        right++;\n    }\n\n    cout << str << endl;\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String str = sc.next();\n        char[] arr = str.toCharArray();\n\n        int left = 0;\n        int right = arr.length - 1;\n\n        while (left < right) {\n            char temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n\n            left++;\n            right++;\n        }\n\n        System.out.println(new String(arr));\n    }\n}",
      python: "def main():\n    s = list(input().strip())\n    \n    left = 0\n    right = len(s) - 1\n    \n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right += 1\n        \n    print(\"\".join(s))\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  },
  {
    id: '207',
    title: 'Binary Search',
    round: 2,
    difficulty: 'Medium',
    points: 20,
    description: `Given a sorted array and a target value, use binary search to determine whether the target exists in the array. If the target is found, print its 0-based index. Otherwise, print -1.`,
    inputFormat: `N\nN integers\nTarget`,
    outputFormat: `Index or -1`,
    constraints: `Array is sorted`,
    publicSample: [{ input: `7\n2 5 8 12 16 23 38\n16`, output: `4` }],
    hiddenTestCases: [
      { input: `7\n2 5 8 12 16 23 38\n10`, output: `-1`, buggyOutput: `-1` },
      { input: `7\n2 5 8 12 16 23 38\n2`, output: `0`, buggyOutput: `0` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    int arr[n];\n\n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n\n    int target;\n    cin >> target;\n\n    int low = 0;\n    int high = n - 1;\n\n    while (low <= high) {\n        int mid = (low + high) / 2;\n\n        if (arr[mid] == target) {\n            cout << mid << endl;\n            return 0;\n        }\n        else if (arr[mid] < target) {\n            high = mid - 1;\n        }\n        else {\n            low = mid + 1;\n        }\n    }\n\n    cout << -1 << endl;\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n\n        int target = sc.nextInt();\n\n        int low = 0;\n        int high = n - 1;\n\n        while (low <= high) {\n            int mid = (low + high) / 2;\n\n            if (arr[mid] == target) {\n                System.out.println(mid);\n                return;\n            }\n            else if (arr[mid] < target) {\n                high = mid - 1;\n            }\n            else {\n                low = mid + 1;\n            }\n        }\n\n        System.out.println(-1);\n    }\n}",
      python: "def main():\n    n = int(input())\n    arr = list(map(int, input().split()))\n    target = int(input())\n    \n    low = 0\n    high = n - 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        \n        if arr[mid] == target:\n            print(mid)\n            return\n        elif arr[mid] < target:\n            high = mid - 1\n        else:\n            low = mid + 1\n            \n    print(-1)\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  },
  {
    id: '208',
    title: 'First Non-Repeating Character',
    round: 2,
    difficulty: 'Medium',
    points: 20,
    description: `Given a string containing lowercase English letters, find the first character that occurs exactly once. If every character occurs more than once, print -1.`,
    inputFormat: `A string`,
    outputFormat: `First non-repeating character or -1`,
    constraints: `Lowercase letters only`,
    publicSample: [{ input: `aabbcdde`, output: `c` }],
    hiddenTestCases: [
      { input: `swiss`, output: `w`, buggyOutput: `w` },
      { input: `aabbcc`, output: `-1`, buggyOutput: `-1` }
    ],
    buggyTemplates: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string str;\n    cin >> str;\n\n    int freq[26] = {0};\n\n    for (char ch : str) {\n        freq[ch - 'a']++;\n    }\n\n    for (char ch : str) {\n        if (freq[ch - 'a'] > 1) {\n            cout << ch << endl;\n            return 0;\n        }\n    }\n\n    cout << -1 << endl;\n\n    return 0;\n}`,
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String str = sc.next();\n\n        int[] freq = new int[26];\n\n        for (char ch : str.toCharArray()) {\n            freq[ch - 'a']++;\n        }\n\n        for (char ch : str.toCharArray()) {\n            if (freq[ch - 'a'] > 1) {\n                System.out.println(ch);\n                return;\n            }\n        }\n\n        System.out.println(-1);\n    }\n}",
      python: "def main():\n    s = input().strip()\n    \n    freq = [0] * 26\n    \n    for ch in s:\n        freq[ord(ch) - ord('a')] += 1\n        \n    for ch in s:\n        if freq[ord(ch) - ord('a')] > 1:\n            print(ch)\n            return\n            \n    print(-1)\n\nif __name__ == \"__main__\":\n    main()"
    },
    solutionCheck: {}
  }
,
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
