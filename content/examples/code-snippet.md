This is an example page showing how to use Hugo shortcodes on the Pulsar Neighborhood site to include code snippets in content.

A very basic snippet:
```csharp
public void DoSomething()
{
    return;
}
```

A more involved snippet using Hugo's [built-in highlighting](https://gohugo.io/content-management/syntax-highlighting/). Now you can call out what is happening in the highlighted lines while still giving the overall functional context.

{{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" >}}
// GetTitleFunc returns a func that can be used to transform a string to
// title case.
//
// The supported styles are
//
// - "Go" (strings.Title)
// - "AP" (see https://www.apstylebook.com/)
// - "Chicago" (see https://www.chicagomanualofstyle.org/home.html)
//
// If an unknown or empty style is provided, AP style is what you get.
func GetTitleFunc(style string) func(s string) string {
  switch strings.ToLower(style) {
  case "go":
    return strings.Title
  case "chicago":
    return transform.NewTitleConverter(transform.ChicagoStyle)
  default:
    return transform.NewTitleConverter(transform.APStyle)
  }
}
{{< / highlight >}}