import TextFile from "../text-file"
import jsxImportParser from "../import-parsers/jsx"
import jsxBuilder from "../builders/jsx"

class JSXFile extends TextFile {
  get importedDependencyPaths() {
    return jsxImportParser(this.path)
  }

  get outputPath() {
    let extension = super.extensions.slice(-1)[0]
    return super.outputPath.replace(`.${extension}`, "")
  }

  async build(props) {
    let built = await jsxBuilder(this.path, props)

    return {
      ...built,
      output: `<!DOCTYPE html>\n\n${built.output}`,
    }
  }

  get isComponent() {
    return true
  }
}

TextFile.registerFileType({
  extension: ".html.jsx",
  klass: JSXFile,
})

export default JSXFile
