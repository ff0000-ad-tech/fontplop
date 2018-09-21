import { ipcRenderer } from "electron";
import * as React from "react";
import * as Dropzone from "react-dropzone";

export const validExtensions = [".otf", ".ttf"];
// export const validExtensions = [".ttf"];

export class App extends React.Component<any, any> {
    validExtensions: Array<String>;

    constructor(props: any) {
        super(props);

        this.validExtensions = validExtensions;
        this.state = {
            dragOver: false
        };
    }

    onDrop(acceptedFiles: Array<any> /* rejected: any */) {
        const acceptedFilePaths = acceptedFiles.map(f => f.path);
        ipcRenderer.send("process-fonts", acceptedFilePaths);
        this.setState({ dragOver: false });
    }

    onDragOver() {
        this.setState({ dragOver: true });
    }

    onDragLeave() {
        this.setState({ dragOver: false });
    }

    public render() {
        const dzStyle = {
            position: "fixed",
            top: "1px",
            left: "1px",
            right: "1px",
            bottom: "1px",
            borderRadius: "5px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#9b0808",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            fontSize: "24px",
            lineHeight: "1em",
            userSelect: "none",
            cursor: "default",
            color: "red"
        };
        const dzActiveStyle = {
            backgroundColor: "rgba(0, 50, 0, 1)",
            borderColor: "green",
            // borderWidth: "10px",
            color: "lime"
        };

        const titleStyle = {
            fontSize: 25,
            marginBottom: 10
        };

        const subtitleStyle = {
            fontSize: 10,
            clear: "both",
            color: "rgba(255,255,255,0.5)",
            padding: "0px 20px",
            lineHeight: "1.75em"
        };

        const subtitleStyleWee = {
            fontSize: 7,
            clear: "both",
            lineHeight: "1.75em",
            letterSpacing: 1,
            position: "absolute",
            bottom: 0,
            right: 4
        };

        const snippetStyle = {
            backgroundColor: this.state.dragOver
                ? "rgba(0,0,0,0.1)"
                : "rgba(255,255,255,0.1)",
            borderRadius: 2,
            padding: "2px 5px",
            display: "inline block",
            marginRight: "2px"
        };

        const _styleWhite = {
            color: "white",
            fontSize: "80%"
        };

        return (
            <Dropzone
                disableClick
                style={dzStyle}
                activeStyle={dzActiveStyle}
                onDrop={this.onDrop.bind(this)}
                onDragOver={this.onDragOver.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
                accept={this.validExtensions.join(", ")}
            >
                <div style={{ padding: 30 }}>
                    <div style={titleStyle}>
                        <span style={_styleWhite}>Plop</span> Font(s){" "}
                        <span style={_styleWhite}>Here</span>
                    </div>
                    <div style={subtitleStyle}>
                        File format must be{" "}
                        {(() =>
                            this.validExtensions.map((ext, index) => (
                                <span key={index} style={snippetStyle}>
                                    {ext}
                                </span>
                            )))()}
                    </div>
                    <div style={subtitleStyleWee}>
                        #FAT mod{" "}
                        <span style={{ fontSize: "130%" }}>v0.0.1b</span>
                    </div>
                </div>
            </Dropzone>
        );
    }
}
