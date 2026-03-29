#include <stdio.h>
#include <string.h>
typedef enum {
    USER_PREFERENCE,
    EXTERNAL_DATA,
    CONSTRAINT
} InputType;

typedef struct {
    char description[100];
    InputType type;
    int priority; 
    float weight; 
} ConflictInput;

void resolveConflict(ConflictInput inputs[], int count) {
    int bestIndex = 0;
    float maxScore = -1.0;

    printf("--- Identifying Conflicts ---\n");
    for (int i = 0; i < count; i++) {
        float currentScore = inputs[i].priority * inputs[i].weight;
        
        printf("Evaluating: %s [Score: %.2f]\n", inputs[i].description, currentScore);

        if (currentScore > maxScore) {
            maxScore = currentScore;
            bestIndex = i;
        }
    }

    printf("\n--- Final Decision ---\n");
    printf("Selected: %s\n", inputs[bestIndex].description);
    
    printf("\n--- Justification ---\n");
    printf("Reason: This input had the highest combined priority (%d) and weight (%.2f).\n", 
            inputs[bestIndex].priority, inputs[bestIndex].weight);
    
    if (inputs[bestIndex].type == CONSTRAINT) {
        printf("Note: Hard constraints generally override soft user preferences.\n");
    }
}

int main() {
    ConflictInput scenario[3] = {
        {"User wants a 5-star hotel", USER_PREFERENCE, 5, 0.4},
        {"Market price is $500/night", EXTERNAL_DATA, 7, 0.8},
        {"Budget limit is $200/night", CONSTRAINT, 10, 0.9} 
    };

    resolveConflict(scenario, 3);

    return 0;
}