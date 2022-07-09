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