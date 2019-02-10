const specification = [
  {
    name: 'tar',
    type: 'object',
    options: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'src',
        type: 'array'
      }
    ]
  },
  {
    name: 'repo',
    type: 'object',
    options: [
      {
        name: 'push',
        type: 'string'
      },
      {
        name: 'pull',
        type: 'string'
      }
    ]
  }
];

export default specification;