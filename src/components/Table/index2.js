import React, { Fragment } from 'react';
import { useTable, useSortBy } from 'react-table';
import {
  Flex,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  chakra,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { TriangleDownIcon, TriangleUpIcon, SearchIcon } from '@chakra-ui/icons';
import Pagination from './pagination';

const TdContent = ({ cell }) => {
  return (
    <Fragment>
      <Td
        display={{
          base: 'table-cell',
          md: 'none',
        }}
        sx={{
          '@media print': {
            display: 'none',
          },
          textTransform: 'uppercase',
          color: useColorModeValue('gray.400', 'gray.400'),
          fontSize: 'xs',
          fontWeight: 'bold',
          letterSpacing: 'wider',
          fontFamily: 'heading',
        }}
        {...cell.getCellProps()}
        isNumeric={cell.column.isNumeric}
      >
        {cell.render('header')}
      </Td>
      <Td
        color={useColorModeValue('gray.500')}
        fontSize="md"
        fontWeight="normal"
      >
        {cell.render('Cell')}
      </Td>
    </Fragment>
  );
};
const TbodyContent = ({ row }) => {
  return (
    <Tr
      display={{
        base: 'grid',
        md: 'table-row',
      }}
      sx={{
        '@media print': {
          display: 'table-row',
        },
        gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
        gridGap: '10px',
      }}
      {...row.getRowProps()}
    >
      {row.cells?.map(cell => (
        <TdContent key={cell.id} cell={cell} />
      ))}
      <Td
        display={{
          base: 'table-cell',
          md: 'none',
        }}
        sx={{
          '@media print': {
            display: 'none',
          },
          textTransform: 'uppercase',
          color: useColorModeValue('gray.400', 'gray.400'),
          fontSize: 'xs',
          fontWeight: 'bold',
          letterSpacing: 'wider',
          fontFamily: 'heading',
        }}
      >
        Ações
      </Td>
      <Td>
        <ButtonGroup variant="solid" size="sm" spacing={3}>
          <IconButton colorScheme="blue" icon={<BsBoxArrowUpRight />} />
          <IconButton colorScheme="green" icon={<AiFillEdit />} />
          <IconButton
            colorScheme="red"
            variant="outline"
            icon={<BsFillTrashFill />}
          />
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

const Component = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  return (
    <Stack
      spacing={4}
      bg={useColorModeValue('white', 'gray.800')}
      sx={{ borderRadius: 6 }}
      p={2}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input type="search" placeholder="Buscar" size="md" />
      </InputGroup>
      <Flex
        w="full"
        //   bg="gray.600"
        //   p={50}
        alignItems="center"
        justifyContent="center"
      >
        <Table
          w="full"
          display={{
            base: 'block',
            md: 'table',
          }}
          sx={{
            '@media print': {
              display: 'table',
            },
            borderRadius: 6,
          }}
          variant="striped"
          colorScheme="blue"
          {...getTableProps()}
        >
          <Thead
            display={{
              base: 'none',
              md: 'table-header-group',
            }}
            sx={{
              '@media print': {
                display: 'table-header-group',
              },
            }}
          >
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers?.map(column => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    isNumeric={column.isNumeric}
                  >
                    {column.render('header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody
            display={{
              base: 'block',
              lg: 'table-row-group',
            }}
            sx={{
              '@media print': {
                display: 'table-row-group',
              },
            }}
            {...getTableBodyProps()}
          >
            {rows.map(row => {
              prepareRow(row);
              return <TbodyContent row={row} key={row.id} />;
            })}
          </Tbody>
        </Table>
      </Flex>
      <Pagination />
    </Stack>
  );
};

export default Component;
