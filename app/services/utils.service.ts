import {Injectable, Inject} from '@angular/core';
import * as fs from 'file-system';

@Injectable()
export class UtilsService {

  public getFilename(path: string) {
    let parts = path.split('/');
    return parts[parts.length - 1];
  }

  public documentsPath(filename: string) {
    return `${fs.knownFolders.documents().path}/${filename}`;
  }
}
