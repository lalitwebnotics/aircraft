import fs from 'fs-extra';
import { Schema } from 'mongoose';
import path from 'path';

export const MEDIA_PATH = path.resolve(process.cwd(), 'media');

/**
 * Media
 */
const Media = new Schema({
  name: String,
  title: String,
  full_path: String,
  type: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

/**
 * Copy file and create media
 */
Media.statics.copy = function copy({ name, title, type }, dir) {
  const target = path.join(MEDIA_PATH, name);
  fs.ensureFileSync(target);
  fs.copySync(path.join(dir, name), target);
  return this.create({
    name,
    title,
    type
  });
};


export default Media;
