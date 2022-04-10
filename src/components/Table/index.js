import React from 'react';
import styled from 'styled-components';
import DataTable, { createTheme } from 'react-data-table-component';
import { SearchIcon } from '@chakra-ui/icons';
import { useColorModeValue, HStack, Button } from '@chakra-ui/react';
import { MdMore } from 'react-icons/md';

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

createTheme(
  'solarized',
  {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    button: {
      default: '#2aa198',
      hover: 'rgba(0,0,0,.08)',
      focus: 'rgba(255,255,255,.12)',
      disabled: 'rgba(255, 255, 255, .34)',
    },
    sortFocus: {
      default: '#2aa198',
    },
  },
  'dark'
);

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrar por nome"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      <SearchIcon />
    </ClearButton>
  </>
);

export const Table = ({ data, columns, ...rest }) => {
  data = data || [];
  columns = columns || [];
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data?.filter(
    item =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <HStack direction="row" spacing={2}>
        <Button
          leftIcon={<MdMore />}
          colorScheme="green"
          variant="solid"
          size="sm"
        >
          Criar Ticket
        </Button>
        <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </HStack>
    );
  }, [filterText, resetPaginationToggle]);

  const paginationComponentOptions = {
    rowsPerPageText: 'Exibir por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <DataTable
      // title="Contact List"
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      paginationComponentOptions={paginationComponentOptions}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      //   selectableRows
      persistTableHead
      style={{ backgroundColor: 'red' }}
      customStyles={{
        table: {
          style: {
            fontFamily: 'roboto',
            backgroundColor: 'transparent',
          },
        },
        tableWrapper: {
          style: {
            backgroundColor: 'transparent',
          },
        },
        rows: {
          style: {
            backgroundColor: 'transparent',
          },
        },
        header: {
          style: {
            backgroundColor: 'transparent',
          },
        },
        subHeader: {
          style: {
            backgroundColor: 'transparent',
          },
        },
        headRow: {
          style: {
            backgroundColor: useColorModeValue('white', 'transparent'),
          },
        },
        cells: {
          style: {
            backgroundColor: useColorModeValue('white', 'transparent'),
            borderBottomWidth: '1px',
            borderBottomColor: useColorModeValue('', '#268ad220'),
          },
        },
        pagination: {
          style: {
            backgroundColor: useColorModeValue('white', 'transparent'),
            color: useColorModeValue('', '#268bd2'),
            borderBottomWidth: '1px',
            borderBottomColor: useColorModeValue('', '#268ad220'),
          },
        },
      }}
      {...rest}
    />
  );
};

export default Table;
