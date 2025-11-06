# Change Log

## 3.10.1

### Patch Changes

- Updated dependencies [3564e7c]
  - @pikun/core@3.10.1
  - @pikun/pm@3.10.1

## 3.10.0

### Patch Changes

- Updated dependencies [4aa9f57]
- Updated dependencies [4aa9f57]
  - @pikun/core@3.10.0
  - @pikun/pm@3.10.0

## 3.9.1

### Patch Changes

- @pikun/core@3.9.1
- @pikun/pm@3.9.1

## 3.9.0

### Patch Changes

- Updated dependencies [bbb8e16]
  - @pikun/core@3.9.0
  - @pikun/pm@3.9.0

## 3.8.0

### Patch Changes

- @pikun/core@3.8.0
- @pikun/pm@3.8.0

## 3.7.2

### Patch Changes

- @pikun/core@3.7.2
- @pikun/pm@3.7.2

## 3.7.1

### Patch Changes

- @pikun/core@3.7.1
- @pikun/pm@3.7.1

## 3.7.0

### Patch Changes

- 7cf3ab6: Make the `TrailingNode` extension's `node` option optional and derive the
  default node type from the editor schema when available.

  Previously the extension used a hard-coded `'paragraph'` default and the
  `node` option was required in the TypeScript definitions. This change:

  - makes `node` optional in the options type,
  - prefers the editor schema's top node default type when resolving the
    trailing node, and
  - falls back to the configured option or `'paragraph'` as a last resort.

  This fixes cases where projects use a different top-level default node and
  prevents the extension from inserting an incorrect trailing node type.

- Updated dependencies [35645d9]
- Updated dependencies [35645d9]
- Updated dependencies [35645d9]
  - @pikun/core@3.7.0
  - @pikun/pm@3.7.0

## 3.6.7

### Patch Changes

- @pikun/core@3.6.7
- @pikun/pm@3.6.7

## 3.6.6

### Patch Changes

- @pikun/core@3.6.6
- @pikun/pm@3.6.6

## 3.6.5

### Patch Changes

- Updated dependencies [1e4caea]
  - @pikun/core@3.6.5
  - @pikun/pm@3.6.5

## 3.6.4

### Patch Changes

- @pikun/core@3.6.4
- @pikun/pm@3.6.4

## 3.6.3

### Patch Changes

- 7024d69: The Selection extension now uses the correct SelectionOptions type, providing accurate typings for its options.
- Updated dependencies [67f7b4a]
  - @pikun/core@3.6.3
  - @pikun/pm@3.6.3

## 3.6.2

### Patch Changes

- @pikun/core@3.6.2
- @pikun/pm@3.6.2

## 3.6.1

### Patch Changes

- @pikun/core@3.6.1
- @pikun/pm@3.6.1

## 3.6.0

### Patch Changes

- Updated dependencies [c0190bd]
  - @pikun/core@3.6.0
  - @pikun/pm@3.6.0

## 3.5.3

### Patch Changes

- @pikun/core@3.5.3
- @pikun/pm@3.5.3

## 3.5.2

### Patch Changes

- @pikun/core@3.5.2
- @pikun/pm@3.5.2

## 3.5.1

### Patch Changes

- @pikun/core@3.5.1
- @pikun/pm@3.5.1

## 3.5.0

### Patch Changes

- @pikun/core@3.5.0
- @pikun/pm@3.5.0

## 3.4.6

### Patch Changes

- Updated dependencies [968016f]
  - @pikun/core@3.4.6
  - @pikun/pm@3.4.6

## 3.4.5

### Patch Changes

- Updated dependencies [0226d42]
- Updated dependencies [37af83b]
- Updated dependencies [f598ac7]
  - @pikun/core@3.4.5
  - @pikun/pm@3.4.5

## 3.4.4

### Patch Changes

- Updated dependencies [00cf1d7]
  - @pikun/core@3.4.4
  - @pikun/pm@3.4.4

## 3.4.3

### Patch Changes

- Updated dependencies [1ea8906]
  - @pikun/core@3.4.3
  - @pikun/pm@3.4.3

## 3.4.2

### Patch Changes

- @pikun/core@3.4.2
- @pikun/pm@3.4.2

## 3.4.1

### Patch Changes

- @pikun/core@3.4.1
- @pikun/pm@3.4.1

## 3.4.0

### Patch Changes

- Updated dependencies [895c73f]
- Updated dependencies [ad51daa]
  - @pikun/core@3.4.0
  - @pikun/pm@3.4.0

## 3.3.1

### Patch Changes

- @pikun/core@3.3.1
- @pikun/pm@3.3.1

## 3.3.0

### Patch Changes

- Updated dependencies [5423726]
- Updated dependencies [5423726]
  - @pikun/core@3.3.0
  - @pikun/pm@3.3.0

## 3.2.2

### Patch Changes

- @pikun/core@3.2.2
- @pikun/pm@3.2.2

## 3.2.1

### Patch Changes

- Updated dependencies [6a2873f]
  - @pikun/core@3.2.1
  - @pikun/pm@3.2.1

## 3.2.0

### Patch Changes

- Updated dependencies [5056e3e]
  - @pikun/core@3.2.0
  - @pikun/pm@3.2.0

## 3.1.0

### Patch Changes

- @pikun/core@3.1.0
- @pikun/pm@3.1.0

## 3.0.9

### Patch Changes

- @pikun/core@3.0.9
- @pikun/pm@3.0.9

## 3.0.8

### Patch Changes

- @pikun/core@3.0.8
- @pikun/pm@3.0.8

## 3.0.7

### Patch Changes

- @pikun/core@3.0.7
- @pikun/pm@3.0.7

## 3.0.6

### Patch Changes

- Updated dependencies [2e71d05]
  - @pikun/core@3.0.6
  - @pikun/pm@3.0.6

## 3.0.5

### Patch Changes

- @pikun/core@3.0.5
- @pikun/pm@3.0.5

## 3.0.4

### Patch Changes

- Updated dependencies [7ed03fa]
  - @pikun/core@3.0.4
  - @pikun/pm@3.0.4

## 3.0.3

### Patch Changes

- Updated dependencies [75cabde]
  - @pikun/core@3.0.3
  - @pikun/pm@3.0.3

## 3.0.2

### Patch Changes

- @pikun/core@3.0.2
- @pikun/pm@3.0.2

## 3.0.1

### Major Changes

- bfec9b2: Adds the new `@pikun/extensions` package which packages multiple utility extensions like `History`, `Placeholder`, `CharacterCount`, `DropCursor`, `GapCursor`, `TrailingNode`, `Focus`, and `Selection`.

  ## CharacterCount

  This extension adds a cursor that indicates where a new node will be inserted when dragging and dropping.

  Migrate from `@pikun/extension-character-count` to `@pikun/extensions`:

  ```diff
  - import CharacterCount from '@pikun/extension-character-count'
  + import { CharacterCount } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { CharacterCount, CharacterCountOptions } from '@pikun/extensions';
  ```

  ## DropCursor

  This extension adds a cursor that indicates where a new node will be inserted when dragging and dropping.

  Migrate from `@pikun/extension-dropcursor` to `@pikun/extensions`:

  ```diff
  - import DropCursor from '@pikun/extension-dropcursor'
  + import { DropCursor } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { DropCursor, DropCursorOptions } from '@pikun/extensions';
  ```

  ## GapCursor

  This extension adds a cursor that appears when you click on a place where no content is present, for example in-between nodes.

  Migrate from `@pikun/extension-gapcursor` to `@pikun/extensions`:

  ```diff
  - import GapCursor from '@pikun/extension-gapcursor'
  + import { GapCursor } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { GapCursor } from '@pikun/extensions';
  ```

  ## History

  This extension adds undo and redo functionality to the editor.

  Migrate from `@pikun/extension-history` to `@pikun/extensions`:

  ```diff
  - import History from '@pikun/extension-history'
  + import { History } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { UndoRedo, UndoRedoOptions } from '@pikun/extensions';
  ```

  ## Placeholder

  This extension adds a placeholder text to the editor, which is displayed when the editor is empty.

  Migrate from `@pikun/extension-placeholder` to `@pikun/extensions`:

  ```diff
  - import Placeholder from '@pikun/extension-placeholder'
  + import { Placeholder } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { Placeholder, PlaceholderOptions } from '@pikun/extensions';
  ```

  ## TrailingNode

  This extension adds a node at the end of the editor, which can be used to add a trailing node like a paragraph.

  ```ts
  import { TrailingNode, TrailingNodeOptions } from '@pikun/extensions';
  ```

  ## Focus

  This extension adds a focus state to the editor, which can be used to style the editor when it's focused.

  Migrate from `@pikun/extension-focus` to `@pikun/extensions`:

  ```diff
  - import Focus from '@pikun/extension-focus'
  + import { Focus } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { Focus, FocusOptions } from '@pikun/extensions';
  ```

  ## Selection

  This extension adds a selection state to the editor, which can be used to style the editor when there's a selection.

  ```ts
  import { Selection, SelectionOptions } from '@pikun/extensions';
  ```

- ce47182: Remove selection decoration when editor is on dragging mode

### Minor Changes

- 52b6644: skip decorations for node selection and non editable editor

### Patch Changes

- 1b4c82b: We are now using pnpm package aliases for versions to enable better version pinning for the monorepository
- 89bd9c7: Enforce type imports so that the bundler ignores TypeScript type imports when generating the index.js file of the dist directory
- 8c69002: Synced beta with stable features
- Updated dependencies [1b4c82b]
- Updated dependencies [1e91f9b]
- Updated dependencies [a92f4a6]
- Updated dependencies [8de8e13]
- Updated dependencies [20f68f6]
- Updated dependencies [5e957e5]
- Updated dependencies [89bd9c7]
- Updated dependencies [d0fda30]
- Updated dependencies [0e3207f]
- Updated dependencies [37913d5]
- Updated dependencies [28c5418]
- Updated dependencies [32958d6]
- Updated dependencies [12bb31a]
- Updated dependencies [9f207a6]
- Updated dependencies [412e1bd]
- Updated dependencies [062afaf]
- Updated dependencies [ff8eed6]
- Updated dependencies [704f462]
- Updated dependencies [95b8c71]
- Updated dependencies [8c69002]
- Updated dependencies [664834f]
- Updated dependencies [ac897e7]
- Updated dependencies [087d114]
- Updated dependencies [32958d6]
- Updated dependencies [fc17b21]
- Updated dependencies [62b0877]
- Updated dependencies [e20006b]
- Updated dependencies [5ba480b]
- Updated dependencies [d6c7558]
- Updated dependencies [062afaf]
- Updated dependencies [9ceeab4]
- Updated dependencies [32958d6]
- Updated dependencies [bf835b0]
- Updated dependencies [4e2f6d8]
- Updated dependencies [32958d6]
  - @pikun/core@3.0.1
  - @pikun/pm@3.0.1

## 3.0.0-beta.30

### Patch Changes

- @pikun/core@3.0.0-beta.30
- @pikun/pm@3.0.0-beta.30

## 3.0.0-beta.29

### Patch Changes

- @pikun/core@3.0.0-beta.29
- @pikun/pm@3.0.0-beta.29

## 3.0.0-beta.28

### Patch Changes

- @pikun/core@3.0.0-beta.28
- @pikun/pm@3.0.0-beta.28

## 3.0.0-beta.27

### Major Changes

- ce47182: Remove selection decoration when editor is on dragging mode

### Patch Changes

- Updated dependencies [412e1bd]
  - @pikun/core@3.0.0-beta.27
  - @pikun/pm@3.0.0-beta.27

## 3.0.0-beta.26

### Patch Changes

- Updated dependencies [5ba480b]
  - @pikun/core@3.0.0-beta.26
  - @pikun/pm@3.0.0-beta.26

## 3.0.0-beta.25

### Patch Changes

- Updated dependencies [4e2f6d8]
  - @pikun/core@3.0.0-beta.25
  - @pikun/pm@3.0.0-beta.25

## 3.0.0-beta.24

### Patch Changes

- @pikun/core@3.0.0-beta.24
- @pikun/pm@3.0.0-beta.24

## 3.0.0-beta.23

### Patch Changes

- @pikun/core@3.0.0-beta.23
- @pikun/pm@3.0.0-beta.23

## 3.0.0-beta.22

### Patch Changes

- @pikun/core@3.0.0-beta.22
- @pikun/pm@3.0.0-beta.22

## 3.0.0-beta.21

### Patch Changes

- Updated dependencies [813674c]
- Updated dependencies [fc17b21]
  - @pikun/core@3.0.0-beta.21
  - @pikun/pm@3.0.0-beta.21

## 3.0.0-beta.20

### Patch Changes

- @pikun/core@3.0.0-beta.20
- @pikun/pm@3.0.0-beta.20

## 3.0.0-beta.19

### Patch Changes

- Updated dependencies [9ceeab4]
  - @pikun/core@3.0.0-beta.19
  - @pikun/pm@3.0.0-beta.19

## 3.0.0-beta.18

### Patch Changes

- @pikun/core@3.0.0-beta.18
- @pikun/pm@3.0.0-beta.18

## 3.0.0-beta.17

### Patch Changes

- Updated dependencies [e20006b]
  - @pikun/core@3.0.0-beta.17
  - @pikun/pm@3.0.0-beta.17

## 3.0.0-beta.16

### Patch Changes

- Updated dependencies [ac897e7]
- Updated dependencies [bf835b0]
  - @pikun/core@3.0.0-beta.16
  - @pikun/pm@3.0.0-beta.16

## 3.0.0-beta.15

### Patch Changes

- Updated dependencies [087d114]
  - @pikun/core@3.0.0-beta.15
  - @pikun/pm@3.0.0-beta.15

## 3.0.0-beta.14

### Patch Changes

- Updated dependencies [95b8c71]
  - @pikun/core@3.0.0-beta.14
  - @pikun/pm@3.0.0-beta.14

## 3.0.0-beta.13

### Patch Changes

- @pikun/core@3.0.0-beta.13
- @pikun/pm@3.0.0-beta.13

## 3.0.0-beta.12

### Patch Changes

- @pikun/core@3.0.0-beta.12
- @pikun/pm@3.0.0-beta.12

## 3.0.0-beta.11

### Patch Changes

- @pikun/core@3.0.0-beta.11
- @pikun/pm@3.0.0-beta.11

## 3.0.0-beta.10

### Patch Changes

- @pikun/core@3.0.0-beta.10
- @pikun/pm@3.0.0-beta.10

## 3.0.0-beta.9

### Patch Changes

- @pikun/core@3.0.0-beta.9
- @pikun/pm@3.0.0-beta.9

## 3.0.0-beta.8

### Patch Changes

- @pikun/core@3.0.0-beta.8
- @pikun/pm@3.0.0-beta.8

## 3.0.0-beta.7

### Patch Changes

- Updated dependencies [d0fda30]
  - @pikun/core@3.0.0-beta.7
  - @pikun/pm@3.0.0-beta.7

## 3.0.0-beta.6

### Patch Changes

- @pikun/core@3.0.0-beta.6
- @pikun/pm@3.0.0-beta.6

## 3.0.0-beta.5

### Patch Changes

- 8c69002: Synced beta with stable features
- Updated dependencies [8c69002]
- Updated dependencies [62b0877]
  - @pikun/core@3.0.0-beta.5
  - @pikun/pm@3.0.0-beta.5

## 3.0.0-beta.4

### Patch Changes

- Updated dependencies [5e957e5]
- Updated dependencies [9f207a6]
  - @pikun/core@3.0.0-beta.4
  - @pikun/pm@3.0.0-beta.4

## 3.0.0-beta.3

### Patch Changes

- 1b4c82b: We are now using pnpm package aliases for versions to enable better version pinning for the monorepository
- Updated dependencies [1b4c82b]
  - @pikun/core@3.0.0-beta.3
  - @pikun/pm@3.0.0-beta.3

## 3.0.0-beta.2

## 3.0.0-beta.1

## 3.0.0-beta.0

### Minor Changes

- 52b6644: skip decorations for node selection and non editable editor

## 3.0.0-next.8

## 3.0.0-next.7

### Patch Changes

- 89bd9c7: Enforce type imports so that the bundler ignores TypeScript type imports when generating the index.js file of the dist directory

## 3.0.0-next.6

### Major Changes

- bfec9b2: Adds the new `@pikun/extensions` package which packages multiple utility extensions like `History`, `Placeholder`, `CharacterCount`, `DropCursor`, `GapCursor`, `TrailingNode`, `Focus`, and `Selection`.

  ## CharacterCount

  This extension adds a cursor that indicates where a new node will be inserted when dragging and dropping.

  Migrate from `@pikun/extension-character-count` to `@pikun/extensions`:

  ```diff
  - import CharacterCount from '@pikun/extension-character-count'
  + import { CharacterCount } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { CharacterCount, CharacterCountOptions } from '@pikun/extensions';
  ```

  ## DropCursor

  This extension adds a cursor that indicates where a new node will be inserted when dragging and dropping.

  Migrate from `@pikun/extension-dropcursor` to `@pikun/extensions`:

  ```diff
  - import DropCursor from '@pikun/extension-dropcursor'
  + import { DropCursor } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { DropCursor, DropCursorOptions } from '@pikun/extensions';
  ```

  ## GapCursor

  This extension adds a cursor that appears when you click on a place where no content is present, for example in-between nodes.

  Migrate from `@pikun/extension-gapcursor` to `@pikun/extensions`:

  ```diff
  - import GapCursor from '@pikun/extension-gapcursor'
  + import { GapCursor } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { GapCursor } from '@pikun/extensions';
  ```

  ## History

  This extension adds undo and redo functionality to the editor.

  Migrate from `@pikun/extension-history` to `@pikun/extensions`:

  ```diff
  - import History from '@pikun/extension-history'
  + import { History } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { History, HistoryOptions } from '@pikun/extensions';
  ```

  ## Placeholder

  This extension adds a placeholder text to the editor, which is displayed when the editor is empty.

  Migrate from `@pikun/extension-placeholder` to `@pikun/extensions`:

  ```diff
  - import Placeholder from '@pikun/extension-placeholder'
  + import { Placeholder } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { Placeholder, PlaceholderOptions } from '@pikun/extensions';
  ```

  ## TrailingNode

  This extension adds a node at the end of the editor, which can be used to add a trailing node like a paragraph.

  ```ts
  import { TrailingNode, TrailingNodeOptions } from '@pikun/extensions';
  ```

  ## Focus

  This extension adds a focus state to the editor, which can be used to style the editor when it's focused.

  Migrate from `@pikun/extension-focus` to `@pikun/extensions`:

  ```diff
  - import Focus from '@pikun/extension-focus'
  + import { Focus } from '@pikun/extensions'
  ```

  Usage:

  ```ts
  import { Focus, FocusOptions } from '@pikun/extensions';
  ```

  ## Selection

  This extension adds a selection state to the editor, which can be used to style the editor when there's a selection.

  ```ts
  import { Selection, SelectionOptions } from '@pikun/extensions';
  ```

## 3.0.0-next.5

## 3.0.0-next.4

### Major Changes

- bfec9b2: Adds the new `@pikun/extensions` package which holds utility extensions
