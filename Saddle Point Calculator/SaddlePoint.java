import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

class MatrixSwingApp extends JFrame 
{
    JTextField rowsField;
    JTextField colsField;
    JTextField[][] matrixAFields;
    JTextArea outputArea;
    JPanel matrixPanel;
    JButton generateMatrixButton;
    JButton calculateButton;

    MatrixSwingApp() 
    {
        setTitle("M x N Zero Sum Game");
        setSize(900, 900);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(null); // Use null layout for absolute positioning

        //Panel for inputs
        JPanel inputPanel = new JPanel();
        inputPanel.setBounds(10, 10, 980, 250); // Position and size of inputPanel
        inputPanel.setLayout(null); // Null layout for inputPanel

        JLabel l1 = new JLabel("Enter number of rows (M) [1-6] :");
        l1.setBounds(20, 10, 360, 30); // Position and size of l1
        l1.setFont(new Font("Arial", Font.PLAIN, 22));
        inputPanel.add(l1);

        rowsField = new JTextField();
        rowsField.setBounds(400, 10, 200, 30); // Position and size of TextField
        rowsField.setFont(new Font("Arial", Font.PLAIN, 20));
        rowsField.setHorizontalAlignment(JTextField.CENTER);
        inputPanel.add(rowsField);

        JLabel l2 = new JLabel("Enter number of columns (N) [1-6] :");
        l2.setBounds(20, 60, 360, 30); // Position and size of l2
        l2.setFont(new Font("Arial", Font.PLAIN, 22));
        inputPanel.add(l2);

        colsField = new JTextField();
        colsField.setBounds(400, 60, 200, 30); // Position and size of TextField
        colsField.setFont(new Font("Arial", Font.PLAIN, 20));
        colsField.setHorizontalAlignment(JTextField.CENTER);
        inputPanel.add(colsField);

        generateMatrixButton = new JButton("Generate Matrix Fields");
        generateMatrixButton.setBounds(20, 120, 310, 35); // Position and size of generateButton
        generateMatrixButton.setFont(new Font("Arial", Font.PLAIN, 19));
        inputPanel.add(generateMatrixButton);

        calculateButton = new JButton("Calculate");
        calculateButton.setBounds(400, 120, 200, 35); // Position and size of calculateButton
        calculateButton.setFont(new Font("Arial", Font.PLAIN, 19));
        inputPanel.add(calculateButton);

        add(inputPanel); // Add inputPanel to the frame

        // Panel for matrix input
        matrixPanel = new JPanel();
        matrixPanel.setBounds(150, 185, 600, 300); // Position and size of matrixPanel
        matrixPanel.setLayout(null); // Null layout for matrixPanel
        add(matrixPanel);

        // Output area
        outputArea = new JTextArea();
        outputArea.setEditable(false);
        outputArea.setFont(new Font("Monospaced", Font.PLAIN, 16));
        JScrollPane scrollPane = new JScrollPane(outputArea);
        scrollPane.setBounds(35, 500, 830, 350); // Position and size of scrollPane
        add(scrollPane);

        // Add ActionListeners
        GenerateMatrixActionListener listener = new GenerateMatrixActionListener();
        generateMatrixButton.addActionListener(listener);
        CalculateActionListener listener1 = new CalculateActionListener();
        calculateButton.addActionListener(listener1);
    }

    // Named inner class for generating matrix fields
    class GenerateMatrixActionListener implements ActionListener 
    {
        public void actionPerformed(ActionEvent e) 
        {
            try 
            {
                int rows = Integer.parseInt(rowsField.getText());
                int cols = Integer.parseInt(colsField.getText());
                int MAX_DIMENSION = 6; // Maximum number of rows and columns

                if (rows < 1 || rows > MAX_DIMENSION || cols < 1 || cols > MAX_DIMENSION) 
                {
                    JOptionPane.showMessageDialog(MatrixSwingApp.this,
                            "Please enter a value between 1 and 6 for both rows and columns.",
                            "Invalid Input",
                            JOptionPane.ERROR_MESSAGE);
                    return;
                }

                matrixPanel.removeAll();
                matrixPanel.setLayout(new GridLayout(rows, cols));

                matrixAFields = new JTextField[rows][cols];
                
                Font customFont = new Font("Monospaced", Font.BOLD, 20);

                for (int i = 0; i < rows; i++) 
                {
                    for (int j = 0; j < cols; j++) 
                    {
                        matrixAFields[i][j] = new JTextField(5);
                        matrixAFields[i][j].setFont(customFont);
                        matrixAFields[i][j].setHorizontalAlignment(JTextField.CENTER);
                        matrixPanel.add(matrixAFields[i][j]);
                    }
                }

                matrixPanel.revalidate();
                matrixPanel.repaint();
            } 
            catch (Exception ex) 
            {
                JOptionPane.showMessageDialog(null,
                        "Please enter valid integers for rows and columns.",
                        "Invalid Input",
                        JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    // Named inner class for calculating matrices
    class CalculateActionListener implements ActionListener 
    {
        public void actionPerformed(ActionEvent e) 
        {
            try 
            {
                int rows = Integer.parseInt(rowsField.getText());
                int cols = Integer.parseInt(colsField.getText());
                int[][] matrixA = new int[rows][cols];
                int[][] matrixB = new int[rows][cols];

                for (int i = 0; i < rows; i++) 
                {
                    for (int j = 0; j < cols; j++) 
                    {
                        matrixA[i][j] = Integer.parseInt(matrixAFields[i][j].getText());
                        matrixB[i][j] = -matrixA[i][j];
                    }
                }

                outputArea.setText("Matrix A:\n");
                outputArea.append(displayMatrix(matrixA, rows, cols) + "\n");
                
                outputArea.append("Matrix B (negative of A):\n");
                outputArea.append(displayMatrix(matrixB, rows, cols) + "\n");

                String result = findAndCompareValues(matrixA, matrixB, rows, cols);
                outputArea.append(result);
            } 
            catch (Exception ex) 
            {
                JOptionPane.showMessageDialog(null,
                        "Please ensure all matrix fields are filled with valid integers.",
                        "Invalid Input",
                        JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    String displayMatrix(int[][] matrix, int rows, int cols) 
    {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                sb.append(matrix[i][j]).append("\t");
            }
            sb.append("\n");
        }
        return sb.toString();
    }

    // Unmodified findAndCompareValues method
    String findAndCompareValues(int[][] matrixA, int[][] matrixB, int rows, int cols) 
    {
        int Maximin = Integer.MIN_VALUE;
        int rowIndex = -1;
        int colIndex = -1;
        int rowForMaximin = -1;
        int colForMaximin = -1;

        for (int i = 0; i < rows; i++) 
        {
            int minInRow = Integer.MAX_VALUE;
            for (int j = 0; j < cols; j++) 
            {
                if (matrixA[i][j] < minInRow) 
                {
                    minInRow = matrixA[i][j];
                    rowIndex = i;
                    colIndex = j;
                }
            }
            if (minInRow > Maximin) 
            {
                Maximin = minInRow;
                rowForMaximin = rowIndex;
                colForMaximin = colIndex;
            }
        }

        int Minimax = Integer.MAX_VALUE;
        rowIndex = -1;
        colIndex = -1;
        int rowForMinimax = -1;
        int colForMinimax = -1;

        for (int j = 0; j < cols; j++) 
        {
            int maxInColumn = Integer.MIN_VALUE;
            for (int i = 0; i < rows; i++) 
            {
                if (matrixB[i][j] > maxInColumn) 
                {
                    maxInColumn = matrixB[i][j];
                    rowIndex = i;
                    colIndex = j;
                }
            }
            if (maxInColumn < Minimax) 
            {
                Minimax = maxInColumn;
                rowForMinimax = rowIndex;
                colForMinimax = colIndex;
            }
        }

        if (rowForMaximin == rowForMinimax && colForMaximin == colForMinimax) 
        {
            return String.format("Saddle Point found at (%d, %d) with value %d in matrix A and value %d in matrix B.\n",
            rowForMaximin+1, colForMaximin+1, Maximin, Minimax);
        } 
        else 
        {
            return "The coordinates do not coincide.\nSaddle Point Not Found.";
        }
    }

    public static void main(String args[]) 
    {
        // Create and display the GUI
        MatrixSwingApp obj = new MatrixSwingApp();
        obj.setVisible(true);
    }
}
