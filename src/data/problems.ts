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
    title: 'Move All Zeros to the End',
    round: 3,
    difficulty: 'Easy',
    points: 30,
    description: `Given an array of N integers, move all the zeros to the end of the array while maintaining the relative order of all non-zero elements. The operation should be performed in-place, meaning that no additional array should be used to store the result.`,
    inputFormat: `The first line contains an integer N, the number of elements.\nThe second line contains N space-separated integers.`,
    outputFormat: `Print the modified array with all zeros moved to the end.`,
    constraints: `1 <= N <= 1000\n-10^5 <= array[i] <= 10^5`,
    publicSample: [
      { input: `7\n1 0 3 0 5 0 2`, output: `1 3 5 2 0 0 0` }
    ],
    hiddenTestCases: [
      { input: `5\n0 1 0 2 3`, output: `1 2 3 0 0`, buggyOutput: `1 2 3 0 0` },
      { input: `4\n1 2 3 4`, output: `1 2 3 4`, buggyOutput: `1 2 3 4` },
      { input: `4\n0 0 0 5`, output: `5 0 0 0`, buggyOutput: `5 0 0 0` },
      { input: `5\n0 0 0 0 0`, output: `0 0 0 0 0`, buggyOutput: `0 0 0 0 0` }
    ],
    buggyTemplates: {
      java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in)\n\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n\n        int pos = 0;\n\n        for (int i = 0; i <= n; i++) {\n            if (arr[i] != 0) {\n                arr[pos] = arr[i];\n                pos--;\n            }\n        }\n\n        while (pos < n) {\n            arr[pos] = 0;\n            pos++;\n        }\n\n        for (int i = 0; i < n; i++) {\n            System.out.print(arr[i] + " ");\n        }\n    }\n}`,
      python: `n = int(input())\narr = list(map(int, input().split()))\n\npos = 0\n\nfor i in range(n + 1):\n    if arr[i] != 0:\n        arr[pos] = arr[i]\n        pos -= 1\n\nwhile pos < n:\n    arr[pos] = 0\n    pos += 1\n\nprint(*arr)`
    },
    solutionCheck: {}
  },
  {
    id: '302',
    title: 'Longest Subarray with Sum K',
    round: 3,
    difficulty: 'Medium',
    points: 35,
    description: `Given an array of positive integers and an integer K, find the length of the longest contiguous subarray whose sum is exactly K. If there is no contiguous subarray whose sum is equal to K, print 0.`,
    inputFormat: `The first line contains two integers N and K.\nThe second line contains N space-separated positive integers.`,
    outputFormat: `Print a single integer representing the length of the longest contiguous subarray whose sum is exactly K.`,
    constraints: `1 <= N <= 1000\n1 <= array[i] <= 10^5\n1 <= K <= 10^9`,
    publicSample: [
      { input: `5 9\n1 2 3 4 5`, output: `2` }
    ],
    hiddenTestCases: [
      { input: `7 5\n1 2 1 1 1 3 2`, output: `4`, buggyOutput: `0` },
      { input: `4 10\n2 4 6 8`, output: `2`, buggyOutput: `0` },
      { input: `5 3\n1 1 1 1 1`, output: `3`, buggyOutput: `0` },
      { input: `4 20\n5 2 3 10`, output: `0`, buggyOutput: `0` }
    ],
    buggyTemplates: {
      java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        int n = sc.nextInt();\n        int k = sc.nextInt()\n        int[] arr = new int[n];\n\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n\n        int left = 0;\n        int sum = 0;\n        int maxLength = 0;\n\n        for (int right = 0; right < n; right++) {\n            sum += arr[right];\n\n            while (sum > k && left < right) {\n                sum -= arr[left + 1];\n                left++;\n            }\n\n            if (sum == k) {\n                maxLength = Math.min(maxLength, right - left + 1);\n            }\n        }\n\n        System.out.println(maxLength);\n    }\n}`,
      python: `n, k = map(int, input().split())\narr = list(map(int, input().split())\n\nleft = 0\ntotal = 0\nmax_length = 0\n\nfor right in range(n):\n    total += arr[right]\n\n    while total > k and left < right:\n        total -= arr[left + 1]\n        left += 1\n\n    if total == k:\n        max_length = min(max_length, right - left + 1)\n\nprint(max_length)`
    },
    solutionCheck: {}
  },
  {
    id: '303',
    title: 'First Non-Repeating Character Using Hash Map',
    round: 3,
    difficulty: 'Medium-Hard',
    points: 35,
    description: `Given a string containing lowercase English letters, find the first character that occurs exactly once in the string. You must use a Hash Map / Dictionary to store the frequency of each character. If every character occurs more than once, print -1. The answer must be the first non-repeating character according to its position in the original string.`,
    inputFormat: `The input contains a single string S.`,
    outputFormat: `Print the first non-repeating character. If no such character exists, print -1.`,
    constraints: `1 <= |S| <= 10^5\nThe string contains only lowercase English letters.`,
    publicSample: [
      { input: `aabbcdde`, output: `c` }
    ],
    hiddenTestCases: [
      { input: `swiss`, output: `w`, buggyOutput: `s` },
      { input: `aabbcc`, output: `-1`, buggyOutput: `-1` },
      { input: `programming`, output: `p`, buggyOutput: `m` },
      { input: `aabbcddcef`, output: `e`, buggyOutput: `f` }
    ],
    buggyTemplates: {
      java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        String s = sc.nextLine();\n        HashMap<Character, Integer> freq = new HashMap<Character, Integer>\n\n        for (char ch : s.toCharArray()) {\n            freq.put(ch, freq.getOrDefault(ch, 0) + 1);\n        }\n\n        char answer = '-';\n\n        for (int i = s.length() - 1; i >= 0; i--) {\n            if (freq.get(s.charAt(i)) == 1) {\n                answer = s.charAt(i);\n            }\n        }\n\n        if (answer == '-') {\n            System.out.println("-1");\n        } else {\n            System.out.println(answer);\n        }\n    }\n}`,
      python: `s = input()\n\nfreq = {}\n\nfor ch in s:\n    freq[ch] = freq.get(ch, 0) + 1\n\nanswer = None\n\nfor i in range(len(s) - 1, -1, -1):\n    if freq[s[i]] = 1:\n        answer = s[i]\n\nif answer == None:\n    print(-1)\nelse:\n    print(answer)`
    },
    solutionCheck: {}
  }

];
