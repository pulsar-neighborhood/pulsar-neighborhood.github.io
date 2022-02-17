This is an example page showing how to use Hugo shortcodes on the Pulsar Neighborhood site to create tabbed information.

{{< tabs tabTotal="4">}}
{{< tab tabName="C#" >}}

```csharp
public void DoSomething()
{
    return;
}
```

{{< /tab >}}
{{< tab tabName="Java" >}}

```java
public Integer getLength(String str)
{
    return str.length();
}
```

{{< /tab >}}
{{< tab tabName="Go">}}

```golang
func plusPlus(a, b, c int) int
{
    return a + b + c
}
```

{{< /tab >}}
{{< tab tabName="Python">}}

```python
def greet(name):
    """
    This function greets to the person passed in as a parameter
    """
    print("Hello, " + name + ". Good morning!")
```

{{< /tab >}}
{{< /tabs >}}
