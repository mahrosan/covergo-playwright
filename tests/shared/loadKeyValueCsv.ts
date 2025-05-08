import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export class LoadKeyValueCsv {
  // Function to read and parse the CSV file
  async readCSV(filePath: string) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return parse(fileContent, {
      columns: true, // Treats the first row as column names
      skip_empty_lines: true, // Skips empty lines
    });
  }
}
