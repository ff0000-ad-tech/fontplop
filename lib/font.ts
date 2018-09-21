import * as path from "path";
import * as replaceExt from "replace-ext";
import * as FontEditorCore from "fonteditor-core";

import * as fs from "fs";
import * as rimraf from "rimraf";
import { execSync } from "child_process";

export class Font {
    filePath: string;
    hasOrphanTTF: boolean;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.createOutputPath();
    }

    createOutputPath() {
        if (!fs.existsSync(this.outputPath)) {
            fs.mkdirSync(this.outputPath);
        }
    }

    readFont() {
        const inBuffer = fs.readFileSync(this.ttfPath);
        return FontEditorCore.Font.create(inBuffer, {
            type: "ttf"
        });
    }

    export() {
        const font = this.readFont();

        const outBuffer = font.write({
            type: this.ext,
            hinting: true
        });

        fs.writeFileSync(this.outFile, outBuffer);
    }

    get inputExt(): string {
        return path.extname(this.filePath).replace(".", "");
    }

    get ext() {
        return "ttf";
    }

    get outFile() {
        return `${this.outputPath}/${this.nameWithoutExt}.${this.ext}`;
    }

    get outputPath() {
        // const output = path.resolve(this.dir, `${this.nameWithoutExt}-export`)
        return this.dir; //output
    }

    get dir() {
        return path.dirname(this.filePath);
    }

    get basename() {
        return path.basename(this.filePath);
    }

    get nameWithoutExt() {
        return path.parse(this.basename).name;
    }

    get fontNameHuman() {
        return this.readFont().data.name.fullName || this.nameWithoutExt;
    }

    get isTTF() {
        return path.parse(this.filePath).ext === ".ttf";
    }

    get isOTF() {
        return path.parse(this.filePath).ext === ".otf";
    }

    hasTTF(): boolean {
        return fs.existsSync(this.ttfPath);
    }

    get ttfPath() {
        return replaceExt(this.filePath, ".ttf");
    }

    copySelf() {
        this.createOutputPath();
        execSync(`
      cp "${this.filePath}" "${this.outputPath}"
    `);
    }

    createOrphanTTF() {
        const inBuffer = fs.readFileSync(this.filePath);

        const font = FontEditorCore.Font.create(inBuffer, {
            type: this.inputExt
        });

        const outBuffer = font.write({
            type: this.ext,
            hinting: true
        });

        this.hasOrphanTTF = true;
        fs.writeFileSync(this.ttfPath, outBuffer);
    }

    cleanupOrphansIfNecessary() {
        if (this.hasOrphanTTF) rimraf.sync(this.ttfPath);
    }
}
