import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import React, { ReactElement } from 'react';
import { useGetCharactersQuery } from '../../generated/graphql';
import CharacterData from '../character-data/character-data';

interface Props { }

export default function CharacterTable(props: Props): ReactElement {
  const { data, loading, error, fetchMore } = useGetCharactersQuery();

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Typography variant='h5'>
        Error retrieving data, please reload the page to try again.
      </Typography>
    )
  }
  else if (!data || !data.characters || !data.characters.results) {
    return (
      <Typography variant='h5'>
        No data available, please reload the page to try again.
      </Typography>
    );
  }

  const characters = data?.characters;
  const next = characters?.info?.next;
  const hasNextPage = Boolean(next);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Species</strong>
            </TableCell>
            <TableCell>
              <strong>Origin</strong>
            </TableCell>
            <TableCell>
              <strong>Location</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.characters.results.map(character => (
            <CharacterData character={character} key={character?.id!} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}