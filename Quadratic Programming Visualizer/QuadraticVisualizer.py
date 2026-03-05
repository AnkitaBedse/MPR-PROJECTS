import tkinter as tk
from tkinter import messagebox
import matplotlib.pyplot as plt

def solve_and_plot():
    global Q, c, A, b

    try:
        Q = [[float(q_entries[i][j].get()) for j in range(n)] for i in range(n)]
        c = [float(c_entries[i].get()) for i in range(n)]
        A = [[float(a_entries[i][j].get()) for j in range(n)] for i in range(m)]
        b = [float(b_entries[i].get()) for i in range(m)]
    except ValueError:
        messagebox.showerror("Input Error", "Please enter valid numerical values.")
        return

    # Get optimization mode (Minimize or Maximize)
    is_maximize = opt_mode.get() == "Maximize"

    # Flip sign of c for maximization
    if is_maximize:
        c = [-val for val in c]

    # Construct KKT matrix and RHS
    KKT_matrix, rhs = construct_KKT(Q, c, A, b)

    try:
        solution = gaussian_elimination(KKT_matrix, rhs)
    except Exception as e:
        messagebox.showerror("Solver Error", f"Error while solving system: {e}")
        return

    x_opt = solution[:n]  # Optimal x values
    opt_type = "Maximum" if is_maximize else "Minimum"
    messagebox.showinfo(f"Optimal {opt_type} Solution", f"Optimal x: {x_opt}")

    # Plot results
    plot_results(x_opt, A, b, opt_type)

def construct_KKT(Q, c, A, b):
    """Construct the KKT matrix and RHS."""
    size = len(Q) + len(A)
    KKT_matrix = [[0.0 for _ in range(size)] for _ in range(size)]

    # Top-left: Q
    for i in range(len(Q)):
        for j in range(len(Q[0])):
            KKT_matrix[i][j] = Q[i][j]

    # Top-right: A^T
    for i in range(len(A)):
        for j in range(len(A[0])):
            KKT_matrix[j][len(Q) + i] = A[i][j]

    # Bottom-left: A
    for i in range(len(A)):
        for j in range(len(A[0])):
            KKT_matrix[len(Q) + i][j] = A[i][j]

    # Bottom-right: Zero matrix
    for i in range(len(A)):
        for j in range(len(A)):
            KKT_matrix[len(Q) + i][len(Q) + j] = 0

    # RHS vector
    rhs = [-val for val in c] + b
    return KKT_matrix, rhs

def gaussian_elimination(A, b):
    """Solve Ax = b using Gaussian elimination."""
    n = len(b)

    for i in range(n):
        # Pivot: find the largest value in the column for stability
        max_row = max(range(i, n), key=lambda x: abs(A[x][i]))
        A[i], A[max_row] = A[max_row], A[i]
        b[i], b[max_row] = b[max_row], b[i]

        # Make the diagonal 1
        diag = A[i][i]
        if abs(diag) < 1e-10:
            raise ValueError("Matrix is singular or nearly singular.")
        for j in range(i, n):
            A[i][j] /= diag
        b[i] /= diag

        # Eliminate values below
        for k in range(i + 1, n):
            factor = A[k][i]
            for j in range(i, n):
                A[k][j] -= factor * A[i][j]
            b[k] -= factor * b[i]

    # Back substitution
    x = [0] * n
    for i in range(n - 1, -1, -1):
        x[i] = b[i] - sum(A[i][j] * x[j] for j in range(i + 1, n))
    return x

def plot_results(x_opt, A, b, opt_type):
    """Plot constraints and optimal solution."""
    fig, ax = plt.subplots()

    # Feasible region shading
    x_vals = [i / 10 for i in range(-100, 101)]
    for i in range(m):
        y_vals = [(b[i] - A[i][0] * x) / A[i][1] if A[i][1] != 0 else float('inf') for x in x_vals]
        ax.plot(x_vals, y_vals, label=f"Constraint {i + 1}")

    # Plot optimal point
    ax.plot(x_opt[0], x_opt[1], 'ro', label=f"Optimal {opt_type} Solution")

    ax.set_xlabel("x1")
    ax.set_ylabel("x2")
    ax.set_title(f"Quadratic Programming Solution ({opt_type})")
    ax.legend()
    root.after(300, root.withdraw) # Hide main window while showing the plot
    plt.grid()
    plt.show()
    root.after(200, root.deiconify) # Show main window after closing the plot

def generate_matrices():
    global q_entries, c_entries, a_entries, b_entries, n, m

    for widget in matrix_frame.winfo_children():
        widget.destroy()

    try:
        n = int(n_var.get())
        m = int(m_constr.get())
    except ValueError:
        messagebox.showerror("Input Error", "Please enter valid integer values for n and m.")
        return

    # Limit variables and constraints to prevent excessive computation
    if n > 4 or m > 4:
        messagebox.showerror("Error", "Too many variables or constraints! Consider reducing the dimensions (n ≤ 4, m ≤ 4).")
        return
    
    # Matrix Q Frame
    q_frame = tk.LabelFrame(matrix_frame, text=" Matrix Q ", padx=9, pady=10, font=("Courier", 18,"bold"),bd=5)
    q_frame.grid(row=0, column=0, padx=(20,10), pady=5)

    # Matrix Q entry box
    q_entries = [[tk.Entry(q_frame, width=6, font=("Courier", 24), justify="center", fg="red",relief="sunken",bd=4, background="#DDF3FF") for _ in range(n)] for _ in range(n)]
    for i in range(n):
        for j in range(n):
            q_entries[i][j].grid(row=i, column=j,ipady=6,padx=5, pady=5,)

    # Vector c Frame
    c_frame = tk.LabelFrame(matrix_frame, text=" Vector c ", padx=9, pady=10, font=("Courier", 18,"bold"),bd=5)
    c_frame.grid(row=0, column=1, padx=(10,20), pady=5)

    # Vector c entry box
    c_entries = [tk.Entry(c_frame, width=6, font=("Courier", 24), justify="center", fg="red",relief="sunken",bd=4, background="#DDF3FF") for _ in range(n)]
    for i in range(n):
        c_entries[i].grid(row=i, column=0,ipady=6,padx=5, pady=5)

    # Matrix A Frame
    a_frame = tk.LabelFrame(matrix_frame, text=" Matrix A ", padx=9, pady=10, font=("Courier", 18,"bold"),bd=5)
    a_frame.grid(row=1, column=0, padx=(20,10), pady=5)

    # Matrix A entry box
    a_entries = [[tk.Entry(a_frame, width=6, font=("Courier", 24), justify="center", fg="red",relief="sunken",bd=4, background="#DDF3FF") for _ in range(n)] for _ in range(m)]
    for i in range(m):
        for j in range(n):
            a_entries[i][j].grid(row=i, column=j,ipady=6,padx=5, pady=5)

    # Vector b Frame
    b_frame = tk.LabelFrame(matrix_frame, text=" Vector b ", padx=9, pady=10, font=("Courier", 18,"bold"),bd=5)
    b_frame.grid(row=1, column=1, padx=(10,20), pady=5)

    # Vector b entry box
    b_entries = [tk.Entry(b_frame, width=6, font=("Courier", 24), justify="center", fg="red",relief="sunken",bd=4, background="#DDF3FF") for _ in range(m)]
    for i in range(m):
        b_entries[i].grid(row=i, column=0, sticky="e",ipady=6,padx=5, pady=5)

    # Optimization Mode Selection (Minimize or Maximize)
    opt_frame = tk.LabelFrame(matrix_frame, text=" Optimization Mode ", padx=5, pady=5, font=("Courier", 18,"bold"))
    opt_frame.grid(row=2, column=0, columnspan=2, padx=5, pady=15)

    # RADIO BUTTON TO SELECT MINIMIZE
    Minimize_RButton = tk.Radiobutton(opt_frame, text="Minimize", variable=opt_mode, value="Minimize", font=("Courier", 18))
    Minimize_RButton.grid(row=0, column=0, padx=20, pady=3)

    # RADIO BUTTON TO SELECT MAXIMIZE
    Maximize_RButton = tk.Radiobutton(opt_frame, text="Maximize", variable=opt_mode, value="Maximize", font=("Courier", 18))
    Maximize_RButton.grid(row=0, column=1, padx=20, pady=3)

# Function to create a custom instruction window
def show_instructions():
    instructions_window = tk.Toplevel(root)
    instructions_window.title("Instructions")
    instructions_window.geometry("600x400")  # Custom window size
    instructions_window.configure(bg="lightgray")

    # Add a scrollable text box
    instruction_text = """
    📝 Instructions:
    ---------------------------------------------------------------------------
    1. Enter the number of variables (n) and constraints (m).
    2. Click 'Generate Matrices' to create the input fields.
    3. Fill in the matrix and vector values.
    4. Select the optimization mode (Minimize or Maximize).
    5. Click 'Solve & Plot' to visualize the solution.

    
    📚 Additional Tips:
    ---------------------------------------------------------------------------
    - Use the 'Help' button anytime to revisit instructions.
    - Press 'Esc' to exit the application.
    - Ensure matrix dimensions are correctly filled.
    """

    # Create a text widget with scrollbars
    text_widget = tk.Text(instructions_window, wrap="word", font=("Arial", 14), padx=10, pady=10, bg="#fff8f0", height=15, width=60)
    text_widget.insert("1.0", instruction_text)
    text_widget.config(state="disabled")  # Make text read-only

    # Add scrollbar
    scroll_bar = tk.Scrollbar(instructions_window, command=text_widget.yview)
    text_widget.config(yscrollcommand=scroll_bar.set)
    scroll_bar.pack(side="right", fill="y")
    text_widget.pack(expand=True, fill="both", padx=10, pady=10)

    # Add a Close button at the bottom
    close_button = tk.Button(instructions_window, text="Close", command=instructions_window.destroy, font=("Arial", 14, "bold"), padx=10, pady=5)
    close_button.pack(pady=10)

def show_button():
    Solve_Plot.grid(row=6, column=0, padx=20, pady=8, columnspan=2)
    Reset_Button.grid(row=7, column=0, padx=20, pady=(0, 10), columnspan=2)

def reset_matrices():
    for entries in [q_entries, a_entries, c_entries, b_entries]:
        for row in entries:
            for cell in (row if isinstance(row, list) else [row]):
                cell.delete(0, tk.END)

# Main GUI setup
root = tk.Tk()
root.title("Quadratic Programming Solver (SciPy)")
root.resizable(False, False)
root.bind("<Escape>", lambda event: root.quit()) # Escape becomes shortcut to quit GUI

# TOPIC NAME
Title_line1 = tk.Label(root, text="Quadratic Programming", font=("Comic Sans MS", 24))
Title_line1.grid(row=0, column=0, padx=20, pady=10, columnspan=2)
Title_line2 = tk.Label(root, text="Solver and Visualizer", font=("Comic Sans MS", 22))
Title_line2.grid(row=1, column=0, padx=20, columnspan=2)

# LABEL ASKING NUMBER OF VARIABLES
Nos_Var = tk.Label(root, text="Number of variables (n):", font=("Arial", 18))
Nos_Var.grid(row=2, column=0, padx=(20,0), pady=20, sticky="w")

# ENTRY BOX FOR NUMBER OF VARIABLES
n_var = tk.Entry(root, width=15, font=("Courier", 18), justify="center", bd=5, background="#DDF3FF")
n_var.grid(row=2, column=1, padx=(35,20), pady=10, sticky="e")
n_var.insert(0, "2")

# LABEL ASKING NUMBER OF CONSTRAINTS
Nos_Contraints = tk.Label(root, text="Number of constraints (m):", font=("Arial", 18))
Nos_Contraints.grid(row=3, column=0, padx=(20,0), sticky="w")

# ENTRY BOX FOR NUMBER OF VARIABLES
m_constr = tk.Entry(root, width=15, font=("Courier", 18), justify="center",bd=4, bg="#DDF3FF")
m_constr.grid(row=3, column=1, padx=(35,20), sticky="e")
m_constr.insert(0, "2")

# BUTTON TO GENERATE MATRICES
Generate_Matrices = tk.Button(root, text="Generate Matrices", command=lambda: [generate_matrices(), show_button()], font=("Arial", 14, "bold"), width=22, foreground="#36454F", bd=4, relief="raised")
Generate_Matrices.grid(row=4, column=0, padx=(20,0), pady=(15,5), sticky="w")

# HELP BUTTON
help_button = tk.Button(root, text="Help", command=show_instructions, font=("Arial", 14, "bold"), width=18, foreground="#36454F", bd=4, relief="raised")
help_button.grid(row=4, column=1, padx=(0,20), pady=(15,5), sticky="e")

# MATRIX INPUT FRAME LOCATION
matrix_frame = tk.Frame(root, padx=10, pady=10)
matrix_frame.grid(row=5, column=0, columnspan=2)

# SOLVING BUTTON
Solve_Plot = tk.Button(root, text="Solve & Plot", command=solve_and_plot, font=("Arial", 14, "bold"), width=18, foreground="#36454F", bd=4, relief="raised")
Solve_Plot.grid(row=6, column=0, padx=20, pady=8, columnspan=2)
Solve_Plot.grid_forget()

# RESET BUTTON TO CLEAR MATRICES
Reset_Button = tk.Button(root, text="Clear Matrices", command=lambda: reset_matrices(), font=("Arial", 14, "bold"), width=18, bg="lightcoral", foreground="#36454F", bd=4, relief="raised")
Reset_Button.grid(row=7, column=0, padx=20, pady=(0,10), columnspan=2)
Reset_Button.grid_forget()

# RADIO BUTTON VARIABLE FOR OPTIMIZATION MODE, DEFAULT SET TO MINIMIZE
opt_mode = tk.StringVar(value="Minimize") 

root.mainloop()
