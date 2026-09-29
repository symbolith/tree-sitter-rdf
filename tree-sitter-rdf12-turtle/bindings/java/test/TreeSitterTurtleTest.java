import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.turtle.TreeSitterTurtle;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterTurtleTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterTurtle.language()));
    }
}
