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

    // Calcuate minimum needed groups count, given there is always a group with the sum S >= the maximum of the items
    // and if the total sum is much more than the maximum, also consider the second maximum, the third maximum ans so on.
    let 
        maximumIndex = 0,
        approximateGroupSum = sortedItems[maximumIndex],
        minGroupsCount = Math.floor(totalSum / approximateGroupSum);

    while (minGroupsCount > maxGroupsCount) {
        approximateGroupSum += sortedItems[++maximumIndex];
        minGroupsCount = Math.floor(totalSum / approximateGroupSum);
    }

    // Try to adjust the groups count, considering the diference between 
    // minimum and maximum at first, and the maximum itself later. 
    let 
        resultGroups: number[][],
        storedMaxGroupSum: number = Infinity,
        storedGroupDifference: number = Infinity;

    for(let groupsCount = minGroupsCount; groupsCount <= maxGroupsCount; ++groupsCount) {

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

        console.log(groupSums);

        let 
            minGroupSum = groupSums[0],
            maxGroupSum = groupSums[0];

        for(let i = 1; i < groupSums.length; ++i) {
            if (groupSums[i] > maxGroupSum) {
                maxGroupSum = groupSums[i];
            }

            if (groupSums[i] < minGroupSum) {
                minGroupSum = groupSums[i];
            }
        }

        const difference = maxGroupSum - minGroupSum;

        if (difference < storedGroupDifference) {
            storedGroupDifference = difference;
            resultGroups = groups;
        } else if (
            Math.abs(difference - storedGroupDifference) < 1e-5
        ) {
            if (maxGroupSum < storedMaxGroupSum) {
                storedMaxGroupSum = maxGroupSum;
                resultGroups = groups;
            }
        } else if (
            difference / storedGroupDifference - 1 < 
            storedMaxGroupSum / maxGroupSum - 1
        ) {
            storedGroupDifference = difference;
            storedMaxGroupSum = maxGroupSum;
            resultGroups = groups;
        }
    }

    // Return the result
    return resultGroups;
} 

export function distribObjects<T>(
    objItems: T[], 
    getObjNumber: (obj: T) => number,
    maxGroupsCount: number
): T[][] {
    const objNumbers: number[] = [];

    // Extract numbers from objects 
    const numberToObjs = objItems.reduce<Record<number, T[]>>((acc, obj) => {
        const objNumber = getObjNumber(obj);

        objNumbers.push(objNumber);

        if (!acc.hasOwnProperty(objNumber)) {
            acc[objNumber] = [];
        }

        acc[objNumber].push(obj);

        return acc;
    }, {});

    const groupedObjNumbers = distrib(objNumbers, maxGroupsCount);

    // Restore objects based on grouped numbers
    return groupedObjNumbers.map((group) => {
        return group.map((objNumber) => {
            return numberToObjs[objNumber].pop();
        });
    });
}
