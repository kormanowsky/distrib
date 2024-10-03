import { distrib, distribObjects } from "../src";

describe('distrib()', () => {
    test('groups 1 value into 1 group', () => {
        expect(distrib([1000], 10)).toEqual([[1000]]);
    });

    test('groups 10 equal values into 4 groups', () => {
        expect(distrib([10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 4)).toEqual([[10, 10, 10], [10, 10, 10], [10, 10], [10, 10]]);
    });

    test('groups 6 big values and 6 small values into 3 groups', () => {
        expect(
            distrib([1000, 0.01, 700, 500, 200, 100, 500, 0.02, 0.03, 0.04, 0.05, 0.06], 4)
        )
            .toEqual([[1000, 0.06, 0.01], [700, 200, 100, 0.05, 0.02], [500, 500, 0.04, 0.03]]);
    });

    test('groups 1 big number, 1 medium and 4 small into 2 groups', () => {
        expect(distrib([5, 5, 5, 5, 10, 20], 3)).toEqual([[20, 5], [10, 5, 5, 5]]);
    });
});

describe('distribObjects()', () => {
    test('groups objects using getter function', () => {
        const objects: Array<{weight: number}> = [];
        for(let i = 0; i < 10; ++i) {
            objects.push({weight: 10 * i + 1});
        }

        expect(
            distribObjects(objects, (obj) => obj.weight, 4)
        ).toEqual([
            [{weight: 91}, {weight: 21}, {weight: 11}],
            [{weight: 81}, {weight: 31}, {weight: 1}],
            [{weight: 71}, {weight: 41}],
            [{weight: 61}, {weight: 51}]
        ]);
    });
});
