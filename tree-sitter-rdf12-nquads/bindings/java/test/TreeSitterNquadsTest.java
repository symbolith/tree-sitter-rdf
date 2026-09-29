import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.nquads.TreeSitterNquads;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterNquadsTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterNquads.language()));
    }
}
