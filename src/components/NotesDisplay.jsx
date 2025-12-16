import React, { useMemo } from 'react';
import { Collapse, Typography, Empty, Card, Button, Space } from 'antd';
import { QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const NotesDisplay = ({ notes, selectedCategory, searchQuery, onEditNote, theme }) => {
  const isDark = theme === 'dark';
  // Filter notes by selected category and search query
  const filteredNotes = useMemo(() => {
    let filtered = notes;
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(note => {
        const questionMatch = note.question.toLowerCase().includes(query);
        const answerMatch = note.answer.toLowerCase().includes(query);
        const categoryMatch = note.category.toLowerCase().includes(query);
        return questionMatch || answerMatch || categoryMatch;
      });
    }
    
    return filtered;
  }, [notes, selectedCategory, searchQuery]);

  // Format answer text with code blocks
  const formatAnswer = (answer) => {
    // Split by code blocks
    const parts = answer.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const [, language, code] = match;
          return (
            <pre key={index} className={`code-block ${theme}`} style={{ 
              padding: '12px', 
              borderRadius: '6px',
              overflowX: 'auto',
              margin: '12px 0'
            }}>
              <code>{code.trim()}</code>
            </pre>
          );
        }
      }
      // Regular text - split by ** for bold
      const textParts = part.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={index}>
          {textParts.map((textPart, textIndex) => {
            if (textPart.startsWith('**') && textPart.endsWith('**')) {
              return <strong key={textIndex}>{textPart.slice(2, -2)}</strong>;
            }
            return <span key={textIndex}>{textPart}</span>;
          })}
        </span>
      );
    });
  };

  if (filteredNotes.length === 0) {
    return (
      <Card className={`empty-card ${theme}`} style={{ margin: '24px', minHeight: '400px' }}>
        <Empty
          description={
            <span className={`empty-text ${theme}`}>
              {searchQuery 
                ? `No notes found matching "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
                : `No notes found for ${selectedCategory === 'All' ? 'this category' : selectedCategory}`}
            </span>
          }
        />
      </Card>
    );
  }

  return (
    <div className={`notes-container ${theme}`} style={{ padding: '24px' }}>
      <Title level={2} className={`notes-title ${theme}`} style={{ marginBottom: '24px' }}>
        {searchQuery 
          ? `Search Results${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
          : selectedCategory === 'All' 
            ? 'All Notes' 
            : `${selectedCategory} Notes`}
        <span className={`notes-count ${theme}`} style={{ marginLeft: '12px', fontSize: '16px', fontWeight: 'normal' }}>
          ({filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'})
        </span>
        {searchQuery && (
          <span className={`search-query ${theme}`} style={{ marginLeft: '12px', fontSize: '14px', fontWeight: 'normal', fontStyle: 'italic' }}>
            for "{searchQuery}"
          </span>
        )}
      </Title>

      <Collapse
        key={`${selectedCategory}-${searchQuery}`}
        accordion={false}
        expandIcon={({ isActive }) => (
          <QuestionCircleOutlined rotate={isActive ? 90 : 0} />
        )}
        className={`notes-collapse ${theme}`}
      >
        {filteredNotes.map((note) => (
          <Panel
            key={note.id}
            header={
              <div className={`panel-header ${theme}`} style={{ 
                fontWeight: 600, 
                fontSize: '16px'
              }}>
                {note.question}
              </div>
            }
            extra={
              onEditNote && (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditNote(note);
                  }}
                  className="edit-btn"
                >
                  Edit
                </Button>
              )
            }
            className={`note-panel ${theme}`}
          >
            <Paragraph className={`note-answer ${theme}`} style={{ 
              fontSize: '15px', 
              lineHeight: '1.8',
              marginBottom: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {formatAnswer(note.answer)}
            </Paragraph>
            <div className={`note-footer ${theme}`} style={{ 
              marginTop: '16px', 
              paddingTop: '12px',
              fontSize: '12px'
            }}>
              Category: <strong>{note.category}</strong>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default NotesDisplay;

