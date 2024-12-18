## Đường dẫn mẫu giao diện:

https://dribbble.com/shots/14709020-Calculator

## Mô tả:

Xây dựng ứng dụng máy tính bỏ túi

### Công nghệ sử dụng

-   React + TypeScript
-   TailwindCSS
-   MathJS

### Tính năng

-   Cập nhật biểu thức khi nhấn nút trên giao diện máy tính.

    -   Đối với các phép tính (+, -, \*, /)

        -   Nếu biểu thức là biểu thức rỗng thì biểu thức sẽ được bắt đầu với 0 và theo sau là phép tính khi nhấn. Ví dụ: Khi biểu thức đang rỗng mà thực hiện nhấn phép tính - thì biểu thức được hiển thị trên giao diện máy tính sẽ là chuỗi "0 -".
        -   Nếu có kết quả tính toán trước đó thì biểu thức sẽ được bắt đầu với kết quả trước và phép tính khi nhấn. Ví dụ: Sau khi thực hiện phép tính có kết quả là 10, khi nhấn nút - thì biểu thức sẽ thành "10 -".
        -   Nếu ký tự cuối của biểu thức là phép tính, mà phép tính đó khác phép tính khi nhấn thì thay thế phép tính cũ sang phép tính mới. Ví dụ: Khi biểu thức đang là "25 +" thì khi nhấn \* thì biểu thức thành "25 \*".

    -   Đối với số

        -   Thực hiện cập nhật biểu thức tính toán bình thường.
        -   Trong trường hợp có kết quả tính toán trước đó, khi nhấn nút số thì sẽ không quan tâm đến kết quả tính toán trước đó mà cập nhật biểu thức tính toán mới.

    -   Đối với ký tự như (%, .)
        -   Giống như biểu thức tính toán.

-   Thay đổi giao diện sáng, tối.

-   Có thể bắt sự kiện nhấn nút trên bàn phím tương ứng như bấm trên giao diện máy tính.
