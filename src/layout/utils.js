import LayersIcon from '@mui/icons-material/Layers';

export const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Note',
    icon: <LayersIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Good note',
      },
      {
        segment: 'traffic',
        title: 'Test note',
      },
    ],
  },
];
