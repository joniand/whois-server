import {WhoisResponseValues} from "../WhoisResponseValues";
import fs from "fs";
export const responseTplParser = (tpl: string, whoisResponseValues: WhoisResponseValues): string => {
    // Read the template file.
    const responseTpl: string = fs.readFileSync(`./responses/${tpl}.tpl`, { encoding: 'utf8' });

    // A little hack-ish but replace {{=var}} with the values whoisResponseValues where var = key
    return responseTpl.replaceAll(/\{\{\=([a-zA-Z0-9]+)\}\}/g, (matched: string): any => {
        const key = matched.replaceAll(/(\{|\}|\=)/gi, '');
        return whoisResponseValues[key as keyof typeof  whoisResponseValues];
    });
}