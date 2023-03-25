import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { exec } from 'node:child_process';
import crypto from 'crypto';
import util from 'node:util';
const asyncExec = util.promisify(exec);
import * as fs from 'fs/promises';

export const config = { api: { bodyParser: false } };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const file = files.File;
    if (!Array.isArray(file)) {
      try {
        const { uuid, filename } = await saveFile(file);
        res.status(200).json({ uuid, filename });
      } catch (e) {
        res.status(500).json({ success: false });
      }
    } else {
      res
        .status(200)
        .json({ success: false, reason: 'Only one file should be uploaded' });
    }
  });
}

async function saveFile(file: formidable.File) {
  const uuid = crypto.randomUUID();
  const filename = file.originalFilename
    ? `${file.originalFilename.slice(0, -4)}.jpeg`
    : `${uuid}.jpeg`;
  const newFilePath = `./public/${uuid}/${filename}`;
  await fs.mkdir(`./public/${uuid}`);
  const command = `dcraw -c -w "${file.filepath}" | convert - "${newFilePath}"`;
  const result = await asyncExec(command);
  if (result.stderr) {
    throw new Error(`could not execute command: ${result.stderr}`);
  }
  return { uuid, filename: filename };
}
