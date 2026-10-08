import re

with open('src/data/problems.ts', 'r') as f:
    content = f.read()

# Define the new buggyTemplates for each problem
templates = {
    '201': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int math, science, english
        math = sc.nextInt();
        science = sc.nextInt();
        english = sc.nextInt();

        int total = math + science + English;
        float average = total / 3;

        System.out.println("Total = " + total);
        System.out.printf("Average = %.2f\n", average)
    }
}''',
        'python': r'''def main():
    math, science, english = map(int, input().split())
    
    total = math + science + English
    average = total / 3
    
    print(f"Total = {total}")
    print(f"Average = {average:.2f}")

if __name__ == "__main__":
    main()'''
    },
    '202': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        int sum = a + b;
        int difference = a - b
        int product = a * B;

        System.out.println("Sum = " + sum);
        System.out.println("Difference = " + difference);
        System.out.println("Product = " + product);
    }
}''',
        'python': r'''def main():
    a, b = map(int, input().split())
    
    sum_val = a + b
    difference = a - b
    product = a * B
    
    print(f"Sum = {sum_val}")
    print(f"Difference = {difference}")
    print(f"Product = {product}")

if __name__ == "__main__":
    main()'''
    },
    '203': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int number
        int num = sc.nextInt();

        if (number > 0) {
            System.out.println("Positive");
        }
        else if (number < 0) {
            System.out.println("Negative")
        }
        else {
            System.out.print("Zero");
        }
    }
}''',
        'python': r'''def main():
    num = int(input())
    
    if number > 0:
        print("Positive")
    elif number < 0:
        print("Negative")
    else:
        print("Zero")

if __name__ == "__main__":
    main()'''
    },
    '204': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j < i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}''',
        'python': r'''def main():
    n = int(input())
    
    for i in range(1, n + 1):
        for j in range(1, i):
            print("*", end="")
        print()

if __name__ == "__main__":
    main()'''
    },
    '205': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;
        int thirdLargest = Integer.MIN_VALUE;

        for (int i = 0; i < n; i++) {
            if (arr[i] > largest) {
                largest = arr[i];
            }
            else if (arr[i] > secondLargest) {
                secondLargest = arr[i];
            }
            else if (arr[i] > thirdLargest) {
                thirdLargest = arr[i];
            }
        }

        System.out.println(thirdLargest);
    }
}''',
        'python': r'''import sys

def main():
    n = int(input())
    arr = list(map(int, input().split()))
    
    largest = -sys.maxsize
    secondLargest = -sys.maxsize
    thirdLargest = -sys.maxsize
    
    for num in arr:
        if num > largest:
            largest = num
        elif num > secondLargest:
            secondLargest = num
        elif num > thirdLargest:
            thirdLargest = num
            
    print(thirdLargest)

if __name__ == "__main__":
    main()'''
    },
    '206': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        char[] arr = str.toCharArray();

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            char temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right++;
        }

        System.out.println(new String(arr));
    }
}''',
        'python': r'''def main():
    s = list(input().strip())
    
    left = 0
    right = len(s) - 1
    
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right += 1
        
    print("".join(s))

if __name__ == "__main__":
    main()'''
    },
    '207': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        int target = sc.nextInt();

        int low = 0;
        int high = n - 1;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] == target) {
                System.out.println(mid);
                return;
            }
            else if (arr[mid] < target) {
                high = mid - 1;
            }
            else {
                low = mid + 1;
            }
        }

        System.out.println(-1);
    }
}''',
        'python': r'''def main():
    n = int(input())
    arr = list(map(int, input().split()))
    target = int(input())
    
    low = 0
    high = n - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            print(mid)
            return
        elif arr[mid] < target:
            high = mid - 1
        else:
            low = mid + 1
            
    print(-1)

if __name__ == "__main__":
    main()'''
    },
    '208': {
        'java': r'''import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.next();

        int[] freq = new int[26];

        for (char ch : str.toCharArray()) {
            freq[ch - 'a']++;
        }

        for (char ch : str.toCharArray()) {
            if (freq[ch - 'a'] > 1) {
                System.out.println(ch);
                return;
            }
        }

        System.out.println(-1);
    }
}''',
        'python': r'''def main():
    s = input().strip()
    
    freq = [0] * 26
    
    for ch in s:
        freq[ord(ch) - ord('a')] += 1
        
    for ch in s:
        if freq[ord(ch) - ord('a')] > 1:
            print(ch)
            return
            
    print(-1)

if __name__ == "__main__":
    main()'''
    }
}

import json

for qid, tmpls in templates.items():
    java_str = json.dumps(tmpls['java'])
    python_str = json.dumps(tmpls['python'])
    
    # We find the buggyTemplates block for this question ID.
    # The JSON format in problems.ts for buggyTemplates looks like:
    #     buggyTemplates: {
    #       cpp: `...`
    #     },
    
    pattern = re.compile(r"(id:\s*'" + qid + r"'.*?buggyTemplates:\s*\{)(\s*cpp:\s*`.*?`)(\s*\})", re.DOTALL)
    
    def replacer(match):
        return match.group(1) + match.group(2) + f",\n      java: {java_str},\n      python: {python_str}" + match.group(3)
        
    content = pattern.sub(replacer, content)

with open('src/data/problems.ts', 'w') as f:
    f.write(content)

