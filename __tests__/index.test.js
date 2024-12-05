import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import Home from '../src/app/page'
 
describe('Home', () => {

  it('renders hero section with image and heading', () => {
    render(<Home />);
    
    // Check if the image with alt text is in the document
    const image = screen.getByAltText('Concert Image');
    expect(image).toBeInTheDocument();

    // Check if the heading is present
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('View and Manage your Library');
  })

  it('renders a button with correct text', () => {
    render(<Home />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Add New Song')
  })

  it('opens the add song popup when clicking "Add New Song"', () => {
    render(<Home />);
    
    const addButton = screen.getByText('Add New Song');
    fireEvent.click(addButton);  // Simulating a click event
    
    const popup = screen.getByText('Add a New Song');
    expect(popup).toBeInTheDocument();
  })

  it('renders the table with the correct headers and rows', async () => {
    render(<Home />);
  
    await waitFor(() => screen.getByRole('table'));
  
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const headers = ['Title', 'Artist', 'Album', 'Genre', 'Actions'];
    headers.forEach((header) => {
      const headerElement = screen.getByText(header);
      expect(headerElement).toBeInTheDocument();
    });
  
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1);
  });
  
})