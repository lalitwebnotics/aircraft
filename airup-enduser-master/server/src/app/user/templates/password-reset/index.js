import  fs from  'fs';
import {join} from 'path';

const submit = fs.readFileSync(join(__dirname,'submit.html'));

module.exports = {
  submit
}
