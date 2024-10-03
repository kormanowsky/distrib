# distrib

Functions to distribute numbers or objects between groups

# Usage 

```typescript 
import {distrib, distribObjects} from '@kormanowsky/distrib';

// Distribute ten 10's into at most 4 groups
// groups = [[10, 10, 10], [10, 10, 10], [10, 10], [10, 10]]
const groups = distrib([10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 4);

// Distribute five objects into at most 3 groups
// objGroups = [[{x: 10}, {x: 10}], [{x:10}, {x: 10}], [{x: 10}]]
const objGroups = distribObjects(
    [{x: 10}, {x: 10}, {x: 10}, {x:10}],
    (obj) => obj.x,
    3
);
```