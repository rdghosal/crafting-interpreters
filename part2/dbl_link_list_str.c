# include <stdlib.h>
# include <stdio.h>

# define MAX_LENGTH 7
const char LETTERS[MAX_LENGTH] = {'h', 'e', 'l', 'l', 'o', '!'};

struct Node {
    struct Node* next;
    struct Node* prev;
    char value;
};
typedef struct Node Node;

Node* make_str(Node* node, int curr_len)
{
    Node* child = malloc(sizeof(Node));
    curr_len++;
    child->value = LETTERS[curr_len];
    if (curr_len != MAX_LENGTH) {
        child->prev = node;
        node->next = make_str(child, curr_len);
    }
    return node;
}

int main(void)
{
    Node start;
    start.value = 'h';
    Node* str = make_str(&start, 0);
    int count = 0;
    do {
        printf("%c", str->value);
        str = str->next;
    } while (str->next != NULL);
}