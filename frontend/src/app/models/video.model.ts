import {Writer} from "./writer.model";
import {Media} from "./media.model";
import {Role} from "./role.model";
import {Director} from "./director.model";
import {Country} from "./country.model";

export interface Video {
  addedAt?:               number;
  allowSync?:             number;
  art?:                   string;
  contentRating?:         string;
  country?:               Country[];
  director?:              Director;
  duration?:              number;
  grandparentArt?:        string;
  grandparentGuid?:       string;
  grandparentKey?:        string;
  grandparentRatingKey?:  number;
  grandparentThumb?:      string;
  grandparentTitle?:      string;
  guid?:                  string;
  id?:                    number;
  index?:                 number;
  key?:                   string;
  librarySectionID?:      number;
  librarySectionKey?:     string;
  librarySectionTitle?:   string;
  librarySectionUUID?:    string;
  media?:                 Media;
  originallyAvailableAt?: string;
  parentGuid?:            string;
  parentIndex?:           number;
  parentKey?:             string;
  parentRatingKey?:       number;
  parentThumb?:           string;
  parentTitle?:           string;
  rating?:                number;
  ratingKey?:             number;
  role?:                  Role[];
  summary?:               string;
  thumb?:                 string;
  title?:                 string;
  type?:                  string;
  updatedAt?:             number;
  writer?:                Writer[];
  year?:                  number;
}

