const osType = (()=>{
    const { Deno } = globalThis;
    if (typeof Deno?.build?.os === "string") {
        return Deno.build.os;
    }
    if ((navigator as any)?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
export const SEPARATOR = isWindows ? "\\" : "/";
