import { sha224 as jsSha224 } from "js-sha256";
import { Principal } from "@dfinity/principal";
import crc32 from "./crc32";
import { Message } from "js-sha256";

type SubAccount = number | number[];

export const principalToAccountIdentifier = (p: Principal, s: SubAccount) => {
  const padding = Buffer.from("\x0Aaccount-id");
  const array = new Uint8Array([
    ...padding,
    ...p.toUint8Array(),
    ...getSubAccountArray(s),
  ]);
  const hash = sha224(array);
  const checksum = crc32(hash);
  const array2 = new Uint8Array([...checksum, ...hash]);
  return buf2hex(array2);
};

export const tokenIdentifier = (principal: string, index: number) => {
  const padding = Buffer.from("\x0Atid");
  const array = new Uint8Array([
    ...padding,
    ...Principal.fromText(principal).toUint8Array(),
    ...to32bits(index),
  ]);
  return Principal.fromUint8Array(array).toText();
};

const getSubAccountArray = (s: SubAccount) => {
  if (Array.isArray(s)) {
    return s.concat(Array(32 - s.length).fill(0));
  } else {
    //32 bit number only
    return Array(28)
      .fill(0)
      .concat(to32bits(s ? s : 0));
  }
};

const to32bits = (num: number) => {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, num);
  return Array.from(new Uint8Array(b));
};

export function sha224(data: Message) {
  const shaObj = jsSha224.create();
  shaObj.update(data);
  return new Uint8Array(shaObj.array());
}

function buf2hex(buffer: ArrayBuffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
