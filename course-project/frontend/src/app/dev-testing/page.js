'use client';

import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import Symbol from '../components/Symbol';
import Divider from '../components/Divider';
import DropDownButton from '../components/DropDownButton';
import PrimaryActionDropDownButton from '../components/PrimaryActionDropDownButton';
import TextField from '../components/TextField';
import TextBox from '../components/TextBox';
import DateInput from '../components/DateInput';
import Select from '../components/Select';
import TagSelect from '../components/TagSelect';
import TaskCard from '../components/TaskCard';
import Popover from '../components/Popover';
import ColorPicker from '../components/ColorPicker';
import colors from '../constants/colors';
import styles from './page.module.css';

export default function DevTestingPage() {
  const handleClick = (label) => {
    console.log(`${label} clicked!`);
    alert(`${label} clicked!`);
  };

  // Input states
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [textBoxValue, setTextBoxValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [dateTimeValue, setDateTimeValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [fruitValue, setFruitValue] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors.primaryGreen);
  const [showPopover, setShowPopover] = useState(false);
  const [showCreateFlow, setShowCreateFlow] = useState(false);
  const [createFlowTab, setCreateFlowTab] = useState('task');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Component Testing & Development Playground</h1>
      <p className={styles.subtitle}>This page is for development testing only - Add your component tests here</p>

      {/* Color Palette Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Color Palette</h2>
        <div className={styles.colorPaletteGrid}>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryBrown }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Brown</p>
              <p className={styles.colorValue}>{colors.primaryBrown}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryBrownDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Brown Dark</p>
              <p className={styles.colorValue}>{colors.primaryBrownDark}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryYellow }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Yellow</p>
              <p className={styles.colorValue}>{colors.primaryYellow}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryYellowDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Yellow Dark</p>
              <p className={styles.colorValue}>{colors.primaryYellowDark}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryOrange }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Orange</p>
              <p className={styles.colorValue}>{colors.primaryOrange}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryOrangeDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Orange Dark</p>
              <p className={styles.colorValue}>{colors.primaryOrangeDark}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryGreen }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Green</p>
              <p className={styles.colorValue}>{colors.primaryGreen}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryGreenDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Green Dark</p>
              <p className={styles.colorValue}>{colors.primaryGreenDark}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryBlue }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Blue</p>
              <p className={styles.colorValue}>{colors.primaryBlue}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryBlueDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Blue Dark</p>
              <p className={styles.colorValue}>{colors.primaryBlueDark}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryPurple }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Purple</p>
              <p className={styles.colorValue}>{colors.primaryPurple}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryPurpleDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Purple Dark</p>
              <p className={styles.colorValue}>{colors.primaryPurpleDark}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryPink }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Pink</p>
              <p className={styles.colorValue}>{colors.primaryPink}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryPinkDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Pink Dark</p>
              <p className={styles.colorValue}>{colors.primaryPinkDark}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryRed }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Red</p>
              <p className={styles.colorValue}>{colors.primaryRed}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.primaryRedDark }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Red Dark</p>
              <p className={styles.colorValue}>{colors.primaryRedDark}</p>
            </div>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>Neutral Colors</h3>
        <div className={styles.colorPaletteGrid}>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.white, border: '1px solid ' + colors.lightGray }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>White</p>
              <p className={styles.colorValue}>{colors.white}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.lightGray }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Light Gray</p>
              <p className={styles.colorValue}>{colors.lightGray}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.mediumGray }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Medium Gray</p>
              <p className={styles.colorValue}>{colors.mediumGray}</p>
            </div>
          </div>
          <div className={styles.colorCard}>
            <div className={styles.colorSwatch} style={{ backgroundColor: colors.black }}></div>
            <div className={styles.colorInfo}>
              <p className={styles.colorName}>Black</p>
              <p className={styles.colorValue}>{colors.black}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Symbol Component Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Symbol Component</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.label}>Plus Symbol</p>
            <Symbol name="Plus" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Ex Symbol</p>
            <Symbol name="Ex" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Cog Symbol</p>
            <Symbol name="Cog" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Coin Symbol</p>
            <Symbol name="Coin" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Task Symbol</p>
            <Symbol name="Task" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Filter Symbol</p>
            <Symbol name="Filter" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Sort Symbol</p>
            <Symbol name="Sort" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Select Symbol</p>
            <Symbol name="Select" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Drop Down Symbol</p>
            <Symbol name="Drop Down" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Check Mark Symbol</p>
            <Symbol name="Check Mark" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Edit Symbol</p>
            <Symbol name="Edit" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Cancel Symbol</p>
            <Symbol name="Cancel" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Clock Symbol</p>
            <Symbol name="Clock" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Info Symbol</p>
            <Symbol name="Info" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Lock Symbol</p>
            <Symbol name="Lock" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Notification Symbol</p>
            <Symbol name="Notification" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Pending Symbol</p>
            <Symbol name="Pending" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Thinking Symbol</p>
            <Symbol name="Thinking" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Trash Symbol</p>
            <Symbol name="Trash" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Warning Symbol</p>
            <Symbol name="Warning" size={24} colour={colors.black} />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Attachment Symbol</p>
            <Symbol name="Attachment" size={24} colour={colors.black} />
          </div>
        </div>
      </section>

      {/* Primary Button Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Primary Button</h2>
        <div className={styles.buttonGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Text Only</p>
            <PrimaryButton
              text="Submit"
              onClick={() => handleClick('Primary - Text Only')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>With Symbol (Left)</p>
            <PrimaryButton
              text="Add Item"
              symbol={<Symbol name="Plus" size={20} colour={colors.white} />}
              onClick={() => handleClick('Primary - Symbol Left')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>With Symbol (Right)</p>
            <PrimaryButton
              text="Next"
              symbol={<Symbol name="Drop Down" size={20} colour={colors.white} />}
              symbolPosition="right"
              onClick={() => handleClick('Primary - Symbol Right')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Symbol Only</p>
            <PrimaryButton
              symbol={<Symbol name="Cog" size={20} colour={colors.white} />}
              onClick={() => handleClick('Primary - Symbol Only')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Custom Background Color</p>
            <PrimaryButton
              text="Custom"
              backgroundColor={colors.primaryRed}
              onClick={() => handleClick('Primary - Custom Color')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>With Outline (No Background)</p>
            <PrimaryButton
              text="Outlined"
              outlineColor={colors.primaryGreen}
              textColor={colors.primaryGreen}
              onClick={() => handleClick('Primary - Outlined')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Custom Text Color</p>
            <PrimaryButton
              text="Custom Text"
              backgroundColor={colors.black}
              textColor={colors.primaryYellow}
              onClick={() => handleClick('Primary - Custom Text Color')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Disabled</p>
            <PrimaryButton
              text="Disabled"
              disabled={true}
              onClick={() => handleClick('Primary - Disabled (Should not fire)')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Disabled with Symbol</p>
            <PrimaryButton
              text="Disabled"
              symbol={<Symbol name="Ex" size={20} colour={colors.white} />}
              disabled={true}
              onClick={() => handleClick('Primary - Disabled Symbol (Should not fire)')}
            />
          </div>
        </div>
      </section>

      {/* Secondary Button Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Secondary Button</h2>
        <div className={styles.buttonGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Text Only</p>
            <SecondaryButton
              text="Cancel"
              onClick={() => handleClick('Secondary - Text Only')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>With Symbol (Left)</p>
            <SecondaryButton
              text="Close"
              symbol={<Symbol name="Ex" size={20} colour={colors.white} />}
              onClick={() => handleClick('Secondary - Symbol Left')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>With Symbol (Right)</p>
            <SecondaryButton
              text="Settings"
              symbol={<Symbol name="Cog" size={20} colour={colors.white} />}
              symbolPosition="right"
              onClick={() => handleClick('Secondary - Symbol Right')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Symbol Only</p>
            <SecondaryButton
              symbol={<Symbol name="Filter" size={20} colour={colors.white} />}
              onClick={() => handleClick('Secondary - Symbol Only')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Custom Outline Color</p>
            <SecondaryButton
              text="Custom"
              outlineColor={colors.primaryRed}
              textColor={colors.primaryRed}
              onClick={() => handleClick('Secondary - Custom Outline')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>With Background</p>
            <SecondaryButton
              text="Background"
              backgroundColor={colors.lightGray}
              outlineColor={colors.primaryGreen}
              textColor={colors.primaryGreenDark}
              onClick={() => handleClick('Secondary - With Background')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Custom Text Color</p>
            <SecondaryButton
              text="Blue Text"
              outlineColor={colors.primaryBlue}
              textColor={colors.primaryBlue}
              onClick={() => handleClick('Secondary - Custom Text Color')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Disabled</p>
            <SecondaryButton
              text="Disabled"
              disabled={true}
              onClick={() => handleClick('Secondary - Disabled (Should not fire)')}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Disabled with Symbol</p>
            <SecondaryButton
              text="Disabled"
              symbol={<Symbol name="Task" size={20} colour={colors.white} />}
              disabled={true}
              onClick={() => handleClick('Secondary - Disabled Symbol (Should not fire)')}
            />
          </div>
        </div>
      </section>

      {/* Combined Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Real World Examples</h2>
        <div className={styles.exampleGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Form Actions</p>
            <div className={styles.buttonRow}>
              <SecondaryButton
                text="Cancel"
                onClick={() => handleClick('Cancel')}
              />
              <PrimaryButton
                text="Submit"
                symbol={<Symbol name="Select" size={20} colour={colors.white} />}
                symbolPosition="right"
                onClick={() => handleClick('Submit')}
              />
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Toolbar Actions</p>
            <div className={styles.buttonRow}>
              <SecondaryButton
                symbol={<Symbol name="Sort" size={20} colour={colors.white} />}
                onClick={() => handleClick('Sort')}
              />
              <SecondaryButton
                symbol={<Symbol name="Filter" size={20} colour={colors.white} />}
                onClick={() => handleClick('Filter')}
              />
              <PrimaryButton
                text="Add New"
                symbol={<Symbol name="Plus" size={20} colour={colors.white} />}
                onClick={() => handleClick('Add New')}
              />
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Modal Dialog</p>
            <div className={styles.buttonRow}>
              <SecondaryButton
                text="Close"
                symbol={<Symbol name="Ex" size={20} colour={colors.white} />}
                onClick={() => handleClick('Close')}
              />
              <PrimaryButton
                text="Confirm"
                onClick={() => handleClick('Confirm')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider Component Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Divider Component</h2>
        <div className={styles.dividerGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Horizontal Divider (Default)</p>
            <div style={{ width: '100%' }}>
              <Divider orientation="horizontal" />
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Horizontal Divider (Custom Color)</p>
            <div style={{ width: '100%' }}>
              <Divider orientation="horizontal" colour={colors.primaryGreen} />
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Vertical Divider (Default)</p>
            <div style={{ display: 'flex', height: '60px', gap: '16px' }}>
              <span>Left</span>
              <Divider orientation="vertical" />
              <span>Right</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Vertical Divider (Custom Color)</p>
            <div style={{ display: 'flex', height: '60px', gap: '16px' }}>
              <span>Left</span>
              <Divider orientation="vertical" colour={colors.primaryRed} />
              <span>Right</span>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>In Button Group</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SecondaryButton
                text="Option 1"
                onClick={() => handleClick('Option 1')}
              />
              <Divider orientation="vertical" colour={colors.mediumGray} />
              <SecondaryButton
                text="Option 2"
                onClick={() => handleClick('Option 2')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Drop Down Button Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Drop Down Button</h2>
        <div className={styles.buttonGrid}>
          <div className={styles.cardNoHover}>
            <p className={styles.label}>Basic Drop Down</p>
            <DropDownButton
              symbol={<Symbol name="Drop Down" size={20} colour={colors.white} />}
              options={[
                {
                  text: 'Edit',
                  action: () => handleClick('Edit'),
                },
                {
                  text: 'Duplicate',
                  action: () => handleClick('Duplicate'),
                },
                {
                  text: 'Delete',
                  action: () => handleClick('Delete'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>With Symbols</p>
            <DropDownButton
              symbol={<Symbol name="Cog" size={20} colour={colors.white} />}
              options={[
                {
                  symbol: <Symbol name="Task" size={16} colour={colors.white} />,
                  text: 'Tasks',
                  action: () => handleClick('Tasks'),
                },
                {
                  symbol: <Symbol name="Filter" size={16} colour={colors.white} />,
                  text: 'Filter',
                  action: () => handleClick('Filter'),
                },
                {
                  symbol: <Symbol name="Sort" size={16} colour={colors.white} />,
                  text: 'Sort',
                  action: () => handleClick('Sort'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Actions Menu</p>
            <DropDownButton
              symbol={<Symbol name="Select" size={20} colour={colors.white} />}
              options={[
                {
                  symbol: <Symbol name="Plus" size={16} colour={colors.white} />,
                  text: 'Add New',
                  action: () => handleClick('Add New'),
                },
                {
                  symbol: <Symbol name="Coin" size={16} colour={colors.white} />,
                  text: 'Purchase',
                  action: () => handleClick('Purchase'),
                },
                {
                  symbol: <Symbol name="Ex" size={16} colour={colors.white} />,
                  text: 'Remove',
                  action: () => handleClick('Remove'),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Primary Action Drop Down Button Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Primary Action Drop Down Button</h2>
        <div className={styles.buttonGrid}>
          <div className={styles.cardNoHover}>
            <p className={styles.label}>Basic Split Button</p>
            <PrimaryActionDropDownButton
              options={[
                {
                  text: 'Save',
                  action: () => handleClick('Save'),
                },
                {
                  text: 'Save As',
                  action: () => handleClick('Save As'),
                },
                {
                  text: 'Save All',
                  action: () => handleClick('Save All'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>With Symbols</p>
            <PrimaryActionDropDownButton
              options={[
                {
                  symbol: <Symbol name="Plus" size={16} colour={colors.white} />,
                  text: 'Create Task',
                  action: () => handleClick('Create Task'),
                },
                {
                  symbol: <Symbol name="Coin" size={16} colour={colors.white} />,
                  text: 'Create Purchase',
                  action: () => handleClick('Create Purchase'),
                }
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Export Actions</p>
            <PrimaryActionDropDownButton
              options={[
                {
                  text: 'Export PDF',
                  action: () => handleClick('Export PDF'),
                },
                {
                  text: 'Export CSV',
                  action: () => handleClick('Export CSV'),
                },
                {
                  text: 'Export JSON',
                  action: () => handleClick('Export JSON'),
                },
                {
                  text: 'Export XML',
                  action: () => handleClick('Export XML'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Single Action (No Dropdown)</p>
            <PrimaryActionDropDownButton
              options={[
                {
                  symbol: <Symbol name="Select" size={16} colour={colors.white} />,
                  text: 'Submit',
                  action: () => handleClick('Submit'),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Tag Select Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tag Select</h2>
        <div className={styles.buttonGrid}>
          <div className={styles.cardNoHover}>
            <p className={styles.label}>Status Example</p>
            <TagSelect
              type="capsule"
              backgroundColour={colors.mediumGray}
              defaultText="Status"
              options={[
                {
                  symbol: <Symbol name="Task" size={16} colour={colors.white} />,
                  text: 'Not Started',
                  backgroundColour: colors.mediumGray,
                  action: () => handleClick('Not Started'),
                },
                {
                  symbol: <Symbol name="Pending" size={16} colour={colors.white} />,
                  text: 'In Progress',
                  backgroundColour: colors.primaryBlue,
                  action: () => handleClick('In Progress'),
                },
                {
                  symbol: <Symbol name="Check Mark" size={16} colour={colors.white} />,
                  text: 'Done',
                  backgroundColour: colors.primaryGreen,
                  action: () => handleClick('Done'),
                },
                {
                  symbol: <Symbol name="Cancel" size={16} colour={colors.white} />,
                  text: 'Cancelled',
                  backgroundColour: colors.primaryRed,
                  action: () => handleClick('Cancelled'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Rounded Style (Blue)</p>
            <TagSelect
              type="rounded"
              backgroundColour={colors.primaryBlue}
              defaultText="Priority"
              options={[
                {
                  text: 'High',
                  action: () => handleClick('High Priority'),
                },
                {
                  text: 'Medium',
                  action: () => handleClick('Medium Priority'),
                },
                {
                  text: 'Low',
                  action: () => handleClick('Low Priority'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>With Symbols (Purple)</p>
            <TagSelect
              type="capsule"
              backgroundColour={colors.primaryPurple}
              defaultText="Category"
              defaultSymbol={<Symbol name="Filter" size={16} colour={colors.white} />}
              options={[
                {
                  symbol: <Symbol name="Task" size={16} colour={colors.white} />,
                  text: 'Tasks',
                  action: () => handleClick('Tasks Category'),
                },
                {
                  symbol: <Symbol name="Coin" size={16} colour={colors.white} />,
                  text: 'Rewards',
                  action: () => handleClick('Rewards Category'),
                },
                {
                  symbol: <Symbol name="Cog" size={16} colour={colors.white} />,
                  text: 'Settings',
                  action: () => handleClick('Settings Category'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Symbol Only (Orange)</p>
            <TagSelect
              type="rounded"
              backgroundColour={colors.primaryOrange}
              defaultSymbol={<Symbol name="Sort" size={16} colour={colors.white} />}
              options={[
                {
                  symbol: <Symbol name="Drop Down" size={16} colour={colors.white} />,
                  text: 'Ascending',
                  action: () => handleClick('Sort Ascending'),
                },
                {
                  symbol: <Symbol name="Drop Down" size={16} colour={colors.white} />,
                  text: 'Descending',
                  action: () => handleClick('Sort Descending'),
                },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>All Colors - Brown</p>
            <TagSelect
              type="capsule"
              backgroundColour={colors.primaryBrown}
              defaultText="Brown Tag"
              options={[
                { text: 'Option 1', action: () => handleClick('Brown 1') },
                { text: 'Option 2', action: () => handleClick('Brown 2') },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>All Colors - Yellow</p>
            <TagSelect
              type="capsule"
              backgroundColour={colors.primaryYellow}
              defaultText="Yellow Tag"
              options={[
                { text: 'Option 1', action: () => handleClick('Yellow 1') },
                { text: 'Option 2', action: () => handleClick('Yellow 2') },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>All Colors - Pink</p>
            <TagSelect
              type="rounded"
              backgroundColour={colors.primaryPink}
              defaultText="Pink Tag"
              options={[
                { text: 'Option 1', action: () => handleClick('Pink 1') },
                { text: 'Option 2', action: () => handleClick('Pink 2') },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>All Colors - Red</p>
            <TagSelect
              type="rounded"
              backgroundColour={colors.primaryRed}
              defaultText="Red Tag"
              options={[
                { text: 'Option 1', action: () => handleClick('Red 1') },
                { text: 'Option 2', action: () => handleClick('Red 2') },
              ]}
            />
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Dark Variant (Green Dark)</p>
            <TagSelect
              type="capsule"
              backgroundColour={colors.primaryGreenDark}
              defaultText="Dark Green"
              options={[
                { text: 'Option 1', action: () => handleClick('Dark Green 1') },
                { text: 'Option 2', action: () => handleClick('Dark Green 2') },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Input Components Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Input Components</h2>

        {/* TextField Examples */}
        <h3 className={styles.subsectionTitle}>TextField</h3>
        <div className={styles.inputGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Basic Text Input</p>
            <TextField
              value={textValue}
              onChange={setTextValue}
              placeholder="Enter your name"
            />
            <p className={styles.inputValue}>Value: {textValue}</p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Email Input</p>
            <TextField
              value={emailValue}
              onChange={setEmailValue}
              placeholder="Enter your email"
              type="email"
            />
            <p className={styles.inputValue}>Value: {emailValue}</p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Error State</p>
            <TextField
              value={errorValue}
              onChange={setErrorValue}
              placeholder="Enter at least 5 characters"
              isError={errorValue.length > 0 && errorValue.length < 5}
              errorMessage="Must be at least 5 characters"
            />
            <p className={styles.inputValue}>Value: {errorValue}</p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Disabled Input</p>
            <TextField
              value="Disabled field"
              onChange={() => {}}
              disabled={true}
            />
          </div>
        </div>

        {/* TextBox Examples */}
        <h3 className={styles.subsectionTitle}>TextBox</h3>
        <div className={styles.inputGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Basic TextBox</p>
            <TextBox
              value={textBoxValue}
              onChange={setTextBoxValue}
              placeholder="Enter multiple lines of text..."
              rows={4}
            />
            <p className={styles.inputValue}>Value: {textBoxValue}</p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Large TextBox</p>
            <TextBox
              value=""
              onChange={() => {}}
              placeholder="A larger text area..."
              rows={6}
            />
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Disabled TextBox</p>
            <TextBox
              value="This textbox is disabled"
              onChange={() => {}}
              disabled={true}
              rows={3}
            />
          </div>
        </div>

        {/* DateInput Examples */}
        <h3 className={styles.subsectionTitle}>Date Input</h3>
        <div className={styles.inputGrid}>
          <div className={styles.cardNoHover}>
            <p className={styles.label}>Date Only</p>
            <DateInput
              value={dateValue}
              onChange={setDateValue}
              placeholder="Select a date"
            />
            <p className={styles.inputValue}>Value: {dateValue}</p>
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Date with Time</p>
            <DateInput
              value={dateTimeValue}
              onChange={setDateTimeValue}
              placeholder="Select date and time"
              includeTime={true}
            />
            <p className={styles.inputValue}>Value: {dateTimeValue}</p>
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Date with Min/Max</p>
            <DateInput
              value=""
              onChange={() => {}}
              placeholder="Limited date range"
              minDate="2025-01-01"
              maxDate="2025-12-31"
            />
            <p className={styles.inputValue}>Range: 2025 only</p>
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Disabled Date</p>
            <DateInput
              value="2025-10-26"
              onChange={() => {}}
              disabled={true}
            />
          </div>
        </div>

        {/* Select Examples */}
        <h3 className={styles.subsectionTitle}>Select</h3>
        <div className={styles.inputGrid}>
          <div className={styles.cardNoHover}>
            <p className={styles.label}>Basic Select</p>
            <Select
              value={selectValue}
              onChange={setSelectValue}
              options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
              placeholder="Choose an option"
            />
            <p className={styles.inputValue}>Selected: {selectValue}</p>
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Fruit Selector</p>
            <Select
              value={fruitValue}
              onChange={setFruitValue}
              options={['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Mango']}
              placeholder="Pick your favorite fruit"
            />
            <p className={styles.inputValue}>Selected: {fruitValue}</p>
          </div>

          <div className={styles.cardNoHover}>
            <p className={styles.label}>Disabled Select</p>
            <Select
              value="Disabled Option"
              onChange={() => {}}
              options={['Option 1', 'Option 2']}
              disabled={true}
            />
          </div>
        </div>
      </section>

      {/* TaskCard Component Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>TaskCard Component</h2>
        <div className={styles.taskCardGrid}>
          <TaskCard
            task={{
              id: '550e8400-e29b-41d4-a716-446655440000',
              title: 'Complete ECE444 Lab Assignment',
              due_date: '2025-10-28T23:59:59Z',
              priority: 'high',
              status: 'in_progress',
            }}
            backgroundColor={colors.white}
            onPriorityChange={(priority) => handleClick(`Priority changed to: ${priority}`)}
            onStatusChange={(status) => handleClick(`Status changed to: ${status}`)}
          />

          <TaskCard
            task={{
              id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
              title: 'Review pull request for frontend components',
              due_date: '2025-10-30T15:30:00Z',
              priority: 'medium',
              status: 'not_started',
            }}
            backgroundColor={colors.lightGray}
            onPriorityChange={(priority) => handleClick(`Priority changed to: ${priority}`)}
            onStatusChange={(status) => handleClick(`Status changed to: ${status}`)}
          />

          <TaskCard
            task={{
              id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
              title: 'Read documentation on Next.js',
              due_date: '2025-10-25T00:00:00Z',
              priority: 'low',
              status: 'completed',
            }}
            backgroundColor={colors.white}
            onPriorityChange={(priority) => handleClick(`Priority changed to: ${priority}`)}
            onStatusChange={(status) => handleClick(`Status changed to: ${status}`)}
          />

          <TaskCard
            task={{
              id: '9f4e5876-4321-40de-944b-e07fc1f90ae7',
              title: 'Meeting with advisor',
              priority: 'medium',
              status: 'cancelled',
            }}
            backgroundColor={colors.lightGray}
            onPriorityChange={(priority) => handleClick(`Priority changed to: ${priority}`)}
            onStatusChange={(status) => handleClick(`Status changed to: ${status}`)}
          />

          <TaskCard
            task={{
              id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
              title: 'This is a very long task title that should be truncated with ellipsis when it gets too long to fit in the container',
              due_date: '2025-11-01T09:00:00Z',
              priority: 'high',
              status: 'not_started',
            }}
            backgroundColor={colors.white}
            onPriorityChange={(priority) => handleClick(`Priority changed to: ${priority}`)}
            onStatusChange={(status) => handleClick(`Status changed to: ${status}`)}
          />
        </div>
      </section>

      {/* New Components Tests */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>New Components</h2>

        {/* ColorPicker */}
        <h3 className={styles.subsectionTitle}>ColorPicker</h3>
        <div className={styles.inputGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Color Picker</p>
            <ColorPicker
              selectedColor={selectedColor}
              onChange={setSelectedColor}
            />
            <p className={styles.inputValue}>Selected: {selectedColor}</p>
          </div>
        </div>

        {/* Popover */}
        <h3 className={styles.subsectionTitle}>Popover</h3>
        <div className={styles.inputGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Basic Popover</p>
            <PrimaryButton
              text="Open Popover"
              onClick={() => setShowPopover(true)}
            />
          </div>
        </div>

        {/* Create Task/Habit/Category */}
        <h3 className={styles.subsectionTitle}>Create Task/Habit/Category Components</h3>
        <div className={styles.buttonGrid}>
          <div className={styles.card}>
            <p className={styles.label}>Create Task Flow (Task Tab)</p>
            <PrimaryButton
              text="Open Create Task"
              onClick={() => {
                setCreateFlowTab('task');
                setShowCreateFlow(true);
              }}
            />
          </div>



          <div className={styles.card}>
            <p className={styles.label}>Create Task Flow (Category Tab)</p>
            <PrimaryButton
              text="Open Create Category"
              onClick={() => {
                setCreateFlowTab('category');
                setShowCreateFlow(true);
              }}
            />
          </div>
        </div>
      </section>

      {/* Popovers */}
      <Popover
        isOpen={showPopover}
        onClose={() => setShowPopover(false)}
        maxWidth="600px"
      >
        <div style={{ padding: '20px' }}>
          <h2>This is a Popover</h2>
          <p>Click the X button or outside to close.</p>
          <div style={{ marginTop: '20px' }}>
            <PrimaryButton
              text="Close"
              onClick={() => setShowPopover(false)}
            />
          </div>
        </div>
      </Popover>

      <Popover
        isOpen={showCreateFlow}
        onClose={() => setShowCreateFlow(false)}
        maxWidth="900px"
      >

      </Popover>
    </div>
  );
}
