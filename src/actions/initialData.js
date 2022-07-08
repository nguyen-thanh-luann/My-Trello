export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-1', 'column-2', 'column-3'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'To do column',
          cardOrder: ['card-1', 'card-2', 'card-3', 'cart-4'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 1',
              cover:
                'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
              //cover: the photo link of card
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 2',
              cover: null,
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 3',
              cover: null,
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 4',
              cover: null,
            },
          ],
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Doing column',
          cardOrder: ['card-5'],
          cards: [
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 5',
              cover:
                'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
            },
          ],
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-9', 'card-10', 'card-11', 'cart-12'],
          cards: [
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 9',
              cover: null,
            },
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 10',
              cover: null,
            },
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 11',
              cover: null,
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 12',
              cover: null,
            },
          ],
        },
      ],
    },
  ],
}
