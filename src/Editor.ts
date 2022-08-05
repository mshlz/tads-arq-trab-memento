export class Editor {
    private text: string = ''
    private fontColor: string = '#ffffff'
    private bgColor: string = '#000000'

    getText() { return this.text }
    setText(value: string) {
        this.text = value
    }

    getFontColor() { return this.fontColor }
    setFontColor(value: string) { this.fontColor = value }

    getBgColor() { return this.bgColor }
    setBgColor(value: string) { this.bgColor = value }

    createSnapshot() {
        return new Snapshot(this, JSON.stringify({
            t: this.text,
            f: this.fontColor,
            b: this.bgColor,
        }))
    }
}

export class Snapshot {
    constructor(private editor: Editor, private state: string, public date = new Date()) { }

    restore() {
        const data = JSON.parse(this.state)
        this.editor.setText(data.t)
        this.editor.setFontColor(data.f)
        this.editor.setBgColor(data.b)
    }
}