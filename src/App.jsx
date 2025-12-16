import React, { useState } from 'react';
import { Layout, Button, Space, ConfigProvider, theme, Input } from 'antd';
import { PlusOutlined, SunOutlined, MoonOutlined, SearchOutlined } from '@ant-design/icons';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import NotesDisplay from './components/NotesDisplay';
import AddNoteModal from './components/AddNoteModal';
import { sampleNotes, categories } from './data/sampleNotes';
import './App.css';

const { Header, Content } = Layout;

function AppContent() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notes, setNotes] = useState(sampleNotes);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddNote = () => {
    setEditingNote(null);
    setModalVisible(true);
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingNote.id ? noteData : note
      ));
    } else {
      // Add new note
      setNotes([...notes, noteData]);
    }
    setModalVisible(false);
    setEditingNote(null);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    setEditingNote(null);
  };

  // Ant Design theme configuration
  const antdThemeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  };

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <Layout className={`app-layout ${theme}`} style={{ minHeight: '100vh' }}>
        <Sidebar
          collapsed={collapsed}
          onCollapse={setCollapsed}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          categories={categories}
          theme={theme}
        />
        <Layout
          className="main-layout"
          style={{
            marginLeft: collapsed ? 80 : 250,
            transition: 'margin-left 0.2s'
          }}
        >
          <Header className="app-header">
            <h1 className="app-title">
              Interview Prep Notes
            </h1>
            <Space size="middle">
              <Input
                placeholder="Search notes..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                size="large"
                style={{
                  width: 300,
                  borderRadius: '6px'
                }}
                className="search-input"
              />
              <Button
                type="text"
                icon={isDark ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                size="large"
                className="theme-toggle-btn"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={handleAddNote}
                className="add-note-btn"
              >
                Add Note
              </Button>
            </Space>
          </Header>
          <Content className="app-content">
            <NotesDisplay
              notes={notes}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onEditNote={handleEditNote}
              theme={theme}
            />
          </Content>
        </Layout>
        <AddNoteModal
          visible={modalVisible}
          onCancel={handleCancelModal}
          onSave={handleSaveNote}
          categories={categories}
          editingNote={editingNote}
        />
      </Layout>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

