/**
 * Distributes given numeric `items` into at most `maxGroupsCount` groups with probably near sum
 * @param items
 * @param maxGroupsCount 
 */
export function distrib(items: number[], maxGroupsCount: number): number[][] {
    // Sort items from the largest to the smallest first, then find their total sum
    const 
        sortedItems = [...items].sort((x, y) => y - x),
        totalSum = sortedItems.reduce((x, y) => x + y, 0);

    // Calcuate actual groups count, given there is always a group with the sum S >= the maximum of the items
    // and if the total sum is much more than the maximum, also consider the second maximum, the third maximum ans so on.
    let 
        maximumIndex = 0,
        approximateGroupSum = sortedItems[maximumIndex],
        groupsCount = Math.floor(totalSum / approximateGroupSum);

    while (groupsCount > maxGroupsCount) {
        approximateGroupSum += sortedItems[++maximumIndex];
        groupsCount = Math.floor(totalSum / approximateGroupSum);
    }

    console.log(groupsCount, maxGroupsCount);

    // Initialize an array for the result and an extra array for sums
    const 
        groups = [],
        groupSums = [];
    
    for(let i = 0; i < groupsCount; ++i) {
        groups.push([]);
        groupSums.push(0);
    }

    // Put items into the groups, every time considering a group with least sum 
    for(let itemIndex = 0; itemIndex < sortedItems.length; ++itemIndex) {
        let 
            minGroupSumIndex = 0, 
            minGroupSum = groupSums[minGroupSumIndex];
        
        for(let groupIndex = 1; groupIndex < groupsCount; ++groupIndex) {
            if (groupSums[groupIndex] < minGroupSum) {
                minGroupSum = groupSums[groupIndex];
                minGroupSumIndex = groupIndex;
            }
        }

        groups[minGroupSumIndex].push(sortedItems[itemIndex]);
        groupSums[minGroupSumIndex] += sortedItems[itemIndex];
    }

    // Return the result
    return groups;
} 
