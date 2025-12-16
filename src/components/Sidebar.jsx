import React from 'react';
import { Layout, Menu } from 'antd';
import {
  CodeOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  CloudOutlined,
  AppstoreOutlined,
  BuildOutlined,
  QuestionCircleOutlined,
  RobotOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

// Icon mapping
const iconMap = {
  'CodeOutlined': CodeOutlined,
  'ThunderboltOutlined': ThunderboltOutlined,
  'RocketOutlined': RocketOutlined,
  'FileTextOutlined': FileTextOutlined,
  'DatabaseOutlined': DatabaseOutlined,
  'CloudOutlined': CloudOutlined,
  'AppstoreOutlined': AppstoreOutlined,
  'BuildOutlined': BuildOutlined,
  'QuestionCircleOutlined': QuestionCircleOutlined,
  'RobotOutlined': RobotOutlined
};

const Sidebar = ({ collapsed, onCollapse, selectedCategory, onCategorySelect, categories, theme, isMobile }) => {
  const isDark = theme === 'dark';

  const menuItems = categories.map(cat => {
    const IconComponent = iconMap[cat.icon] || FileTextOutlined;
    return {
      key: cat.key,
      icon: <IconComponent />,
      label: cat.label
    };
  });

  // For mobile drawer, don't use Sider component
  if (isMobile) {
    return (
      <div className={`mobile-sidebar ${theme}`}>
        <div className={`sidebar-header ${theme}`} style={{ 
          padding: '16px', 
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          📝 Notes
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedCategory]}
          items={menuItems}
          onClick={({ key }) => onCategorySelect(key)}
          theme={isDark ? 'dark' : 'light'}
          style={{
            borderRight: 0,
            marginTop: '8px'
          }}
        />
      </div>
    );
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={250}
      className={`app-sidebar ${theme}`}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        boxShadow: isDark ? '2px 0 8px rgba(0,0,0,0.5)' : '2px 0 8px rgba(0,0,0,0.1)'
      }}
      theme={isDark ? 'dark' : 'light'}
    >
      <div className={`sidebar-header ${theme}`} style={{ 
        padding: '16px', 
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: collapsed ? '14px' : '18px'
      }}>
        {collapsed ? '📝' : '📝 Notes'}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedCategory]}
        items={menuItems}
        onClick={({ key }) => onCategorySelect(key)}
        theme={isDark ? 'dark' : 'light'}
        style={{
          borderRight: 0,
          marginTop: '8px'
        }}
      />
    </Sider>
  );
};

export default Sidebar;

