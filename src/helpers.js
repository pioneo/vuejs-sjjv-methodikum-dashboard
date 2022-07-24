/**
 * @author Kerstin Neininger <kerstin.neininger@gmail.com>
 */

/**
 * Compare two objects based on name property.
 * Needed to sort dictionary by values.
 *
 * @param {object} obj1 - The first object to compare against.
 * @param {object} obj2 - The second object to compare against.
 * @returns {number} - The result of the comparison.
 */
export function compare(obj1, obj2) {
    if (obj1.name < obj2.name) {
        return -1;
    }
    if (obj1.name > obj2.name) {
        return 1;
    }
    return 0;
}

/**
 * Download content as file.
 *
 * @param {object} content - Content to be stored, e.g. JSON file.
 * @param {string} filename - File name of the file to be saved. Date and time are added as prefix.
 */
export function saveTextAsFile(content, filename) {
    var data = JSON.stringify(content);
    var blob = new Blob([data], { type: "text/plain" });
    var link = document.createElement("a");
    link.download = new Date().toISOString() + "_" + filename;

    if (window.webkitURL != null) {
        link.href = window.webkitURL.createObjectURL(blob);
    } else {
        link.href = window.URL.createObjectURL(blob);
        link.style.display = "none";
        document.body.appendChild(link);
    }
    link.click();
}