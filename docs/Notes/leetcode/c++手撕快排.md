
```c++
#include <iostream>
using namespace std;

void quicksort(int a[], int l, int h)
{
    if(l>=h)
        return;
    int low = l, high = h;
    int temp = a[low];
    while(low<high){
        while(low<high&&a[high]>=temp){
            high--;
        }
        if(low<high&&a[high]<=temp){
            a[low] = a[high];
        }

        while(low<high&&a[low]<=temp){
            low++;
        }
        if(low<high&&a[low]>=temp){
            a[high] = a[low];
        }
    }
    a[low] = temp;
    quicksort(a, l, low - 1);
    quicksort(a, low + 1, h);
}

int main()
{
    int n;
    cin >> n;
    int a[100];
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
    }
    quicksort(a, 0, n - 1);
    for (int i = 0; i < n; i++)
    {
        cout << a[i] << " ";
    }
    return 0;
}
```