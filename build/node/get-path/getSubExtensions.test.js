import { getSubExtensions } from "./getSubExtensions.js";
const test = () => {
    //   getSubExtensions(absolutePath).includes(temporaryConvertedSubextension)   ,
    console.log(getSubExtensions("/Users/king/King/assets/recordings/1673244762157.converted.mp3"));
    console.log(getSubExtensions("/Users/king/King/assets/recordings/1673244762157.transcription.mp3"));
    console.log(getSubExtensions("/Users/king/King/assets/recordings/1673244762157.Transcription.mp3"));
    console.log(getSubExtensions("/Users/king/King/assets/recordings/1673244762157.android.ios.mp3"));
    console.log(getSubExtensions("/Users/king/King/assets/recordings/1673244762157.walla.walla.watch.this.3.mp3"));
};
test();
//# sourceMappingURL=getSubExtensions.test.js.map